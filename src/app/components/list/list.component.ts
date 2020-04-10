import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Prodotto } from 'src/app/models/prodotto.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  prodotti: Prodotto[];
  

  constructor(private prodottiService:ProdottiService) {
    prodottiService.getProdottiFromFirebase();
    this.prodotti = prodottiService.getListaProdotti();
  }

  ngOnInit(): void {
  }

}
