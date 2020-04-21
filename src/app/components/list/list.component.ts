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

  constructor(private prodottiService:ProdottiService,private fb: FormBuilder, private router:Router,public db:AngularFireDatabase,private listService:ListaService) {
    console.log(this.listeUtente);
    
    console.log(this.liste.length)
    this.prodotti = this.prodottiService.getListaProdotti();
    this.listForm = this.fb.group({
      nomeLista: ['',Validators.required],
    });
    this.items = db.list('lists').valueChanges();
    this.listeUtente=[];
    this.liste=[];
  }

  ngOnInit(): void {
    this.prodottiService.getProdottiFromFirebase();
    this.liste=this.listService.getListsFromFirebase();
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
      console.log(this.liste.length);
    }
    else{
      window.alert("LA LISTA DEVE CONTENERE ALMENO UN ARTICOLO");
    }
  }
 
  
  showProfileLists(){
    this.listeUtente=[];
    console.log(this.liste.length);
    this.liste.forEach(list => {
      if(list.user==sessionStorage.getItem('username')){
        this.listeUtente.push(list);
      }
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
    this.lista={
      nome: '',
      prodotti: [],
      user: ''
    };
    this.hasNome=false;
    this.isSave=false;
    console.log(this.liste.length);
  }
  
}
