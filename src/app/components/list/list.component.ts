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
    this.prodotti=[];
    this.prodotti = this.prodottiService.getListaProdotti();
    this.listForm = this.fb.group({
      nomeLista: ['',Validators.required],
    });
    this.items = db.list('lists').valueChanges();
    this.itemsRef=this.db.list('/lists');
  }

  ngOnInit(): void {
    this.liste=[];
    if(this.prodottiService.getListaProdotti().length==0){
      this.prodottiService.getProdottiFromFirebase();
    }
  }

  createList(form){
    let nome=form.nomeLista;
    this.lista.nome = nome;
    this.lista.user = sessionStorage.getItem('username');
    this.hasNome = true;
    this.isProfile = false;
  }

  addToList(prodotto: Prodotto){
    this.lista.prodotti.push(prodotto);
    window.alert("PRODOTTO AGGIUNTO");
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  salvaLista(){
    if(this.lista.prodotti.length>0){
      this.db.list('lists').push(this.lista);
      window.alert("LISTA SALVATA ORA VEDRAI IL RESOCONTO");
      this.isSave=true;
    }
    else{
      window.alert("LA LISTA DEVE CONTENERE ALMENO UN ARTICOLO");
    }
  }
  
  showProfileLists(){
    window.alert("Caricamento liste da DB");
    this.isProfile=true;
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
    this.listeUtente=[];
  }

  getListsFromFirebase(){
    console.log(sessionStorage.getItem('username'))
    this.listeUtente=[];
    this.itemsRef.snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({...c.payload.val()})
          )
        )
    ).subscribe(lists =>{
      lists.forEach(list => {
      console.log(list.user);
      if(list.user===sessionStorage.getItem('username')){
        let jsonObj: any = JSON.stringify(list);
        let lista: Lista=JSON.parse(jsonObj);
        this.listeUtente.push(lista);
      }
      });
    });
    console.log(this.listeUtente);
    this.showProfileLists();
  }
}
