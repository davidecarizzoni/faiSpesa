import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Prodotto } from 'src/app/models/prodotto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  prodotti: Prodotto[];
  listForm: FormGroup;
  

  constructor(private prodottiService:ProdottiService,private fb: FormBuilder, private router:Router) {
    prodottiService.getProdottiFromFirebase();
    this.prodotti = this.prodottiService.getListaProdotti();
    console.log(this.prodotti.length)
    this.listForm = this.fb.group({
      nomeLista: ['',Validators.required],
    });
  }

  ngOnInit(): void {}

  addToList(prodotto:Prodotto){}

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
  }
}
