import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Prodotto } from 'src/app/models/prodotto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.interface';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  prodotti: Prodotto[];
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
    this.prodotti = this.prodottiService.getListaProdotti();

    this.listForm = this.fb.group({
      nomeLista: ['',Validators.required],
    });

    this.items = db.list('lists').valueChanges();
  }

  ngOnInit(): void {}

  createList(form){
    this.lista.nome = form;
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
    this.db.list('lists').push(this.lista);
    window.alert("LISTA SALVATA ORA VEDRAI IL RESOCONTO");
    this.isSave=true;
  }
}
