import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Prodotto } from 'src/app/models/prodotto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.interface';
import { Observable } from 'rxjs';
import { ListaService } from 'src/app/services/lista.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  prodotti: Prodotto[];
  liste: Lista[] = [];
  listeUtente: Lista[] = [];
  lista: Lista = {
    nome: '',
    prodotti: [],
    user: ''
  };
  listForm: FormGroup;
  hasNome = false;
  isSave=false;
  items: Observable <any[]>;
  isProfile=false;
  i:number;
  lunghezza:Number;

  constructor(private prodottiService:ProdottiService,private fb: FormBuilder, private router:Router,public db:AngularFireDatabase,private listService:ListaService) {
    this.prodotti = this.prodottiService.getListaProdotti();
    this.listForm = this.fb.group({
      nomeLista: ['',Validators.required],
    });
    this.items = db.list('lists').valueChanges();
    this.itemsRef=this.db.list('/lists');
  
  }

  ngOnInit(): void {
    this.liste=[];
    //this.listService.svuotaLista();
    this.prodottiService.getProdottiFromFirebase();
    this.getListsFromFirebase()
    //this.liste=this.listService.getListe();
  }

  createList(form){
    let nome=form.nomeLista;
    this.lista.nome = nome;
    this.lista.user = sessionStorage.getItem('username');
    this.hasNome = true;
  }

  addToList(prodotto: Prodotto){
    this.lista.prodotti.push(prodotto);
    window.alert("PRODOTTO AGGIUNTO");
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
  }

  salvaLista(){
    if(this.lista.prodotti.length>0){
      this.db.list('lists').push(this.lista);
      window.alert("LISTA SALVATA ORA VEDRAI IL RESOCONTO");
      this.isSave=true;
      //console.log(this.liste.length);
      //console.log(this.listService.getListe());
    }
    else{
      window.alert("LA LISTA DEVE CONTENERE ALMENO UN ARTICOLO");
    }
  }

  
  showProfileLists(){
    //this.listService.getListsFromFirebase;
    //this.liste=this.listService.getListe();
    //console.log(this.listService.getListe());
    // console.log(this.liste.length/2-0.5);
    // console.log((this.liste.length/2)%2);
    
  //   this.lunghezza=(this.liste.length/2)%2;
  //   if(this.lunghezza!=0){
  //     for (let index = this.liste.length/2-0.5; index < this.liste.length; index++) {
  //       if(this.liste[index].user==sessionStorage.getItem('username')){
  //         this.listeUtente.push(this.liste[index]);
  //       }
        
  //     }
  //   }
  //   else{
  //   for (let index = this.liste.length/2; index < this.liste.length; index++) {
  //     if(this.liste[index].user==sessionStorage.getItem('username')){
  //       this.listeUtente.push(this.liste[index]);
  //     }
      
  //   }
  // }
  //console.log(this.listService.getListe());
  this.liste.forEach(element => {
    this.listeUtente.push(element);
  });
    if(this.listeUtente.length>0){
      this.isProfile=true;
      window.alert("Visualizzazione tabelle")
    }
    else{
      window.alert("l'utente non ha liste")
    }
    console.log(this.listeUtente);
  }
 
  nuovaLista(){
    this.isProfile=false;
    this.lista={
      nome: '',
      prodotti: [],
      user: ''
    };
    this.hasNome=false;
    this.isSave=false;
    //console.log(this.liste.length);
    this.listeUtente=[];
    // this.liste=[];
    // this.listService.svuotaLista();
    // this.listService.getListsFromFirebase();
  }

  getListsFromFirebase(){
    let list: Lista[] = [];
    this.itemsRef.snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({...c.payload.val()})
          )
        )
    ).subscribe(lists =>{
      lists.forEach(list => {
        let jsonObj: any = JSON.stringify(list);
        let lista: Lista=JSON.parse(jsonObj);
        list.push(lista)
      });
    });
    console.log(list);
    this.liste=list;
  }
  
}
