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
  lista: Lista = {
    nome: '',
    prodotti: [],
    user: ''
  };
  listForm: FormGroup;
  hasNome = false;
  isSave=false;
  items: Observable <any[]>;

  constructor(private prodottiService:ProdottiService,private fb: FormBuilder, private router:Router,public db:AngularFireDatabase) {
    prodottiService.getProdottiFromFirebase();
    this.getListsFromFirebase();
    console.log(this.liste);
    this.prodotti = this.prodottiService.getListaProdotti();

    this.listForm = this.fb.group({
      nomeLista: ['',Validators.required],
    });
    this.items = db.list('lists').valueChanges();
  }

  ngOnInit(): void {}

  createList(form){
    let nome=form.nomeLista;
    this.lista.nome = nome;
    this.lista.user = sessionStorage.getItem('username');
    this.hasNome = true;
  }

  addToList(prodotto: Prodotto){
    this.lista.prodotti.push(prodotto);
    console.log(this.lista.prodotti);
    window.alert("PRODOTTO AGGIUNTO");
    console.log(this.lista);
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
    }
    else{
      window.alert("LA LISTA DEVE CONTENERE ALMENO UN ARTICOLO");
    }
  }
  getListsFromFirebase(){
    this.itemsRef=this.db.list('/lists');
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
        this.liste.push(lista);
        console.log(this.liste);
      });
    });
  }
}
