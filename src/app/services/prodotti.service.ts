import { Injectable } from '@angular/core';
import { Prodotto } from '../models/prodotto.interface';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private prodotti: Prodotto[] = [
      // {nome: 'RedBull', descrizione:'Red Bull è una bevanda energetica analcolica di colore ambrato brillante, con taurina e caffeina.', prezzo:4, img:''},
      // {nome: 'Riso basmati', descrizione:'Il riso basmati è una varietà di riso a chicco lungo dal sapore caratteristico e molto profumata.', prezzo:2, img:''},
      // {nome: 'Penne integrali barilla', descrizione:'Le Penne Rigate Integrali Barilla, dal diametro ridotto e fonte naturale di fibre.', prezzo:1, img:''},
      // {nome: 'Hamburger', descrizione:'Polpetta di carne macinata, compressa a formare una specie di medaglione.', prezzo:5, img:''},
      // {nome: 'I rustici Giovanni Rana', descrizione:'La linea di pasta ripiena in cui ritrovi tutto il piacere della tradizione.', prezzo:1.50, img:''},
      // {nome: 'Parmigiano reggiano', descrizione:'Il Parmigiano Reggiano è un formaggio a pasta dura DOP, prodotto con latte vaccino crudo.', prezzo:8, img:''},
  ]

  itemsRef: AngularFireList<Prodotto> = null;
  itemValue: Prodotto = null;
  items: Observable <any[]>;
  utenti : any;
  
  constructor(private router:Router,public db:AngularFireDatabase) {
    this.itemsRef=db.list('/prodotti');
    // this.items = db.list('prodotti').valueChanges();
    // this.prodotti.forEach(prodotto => {
    //   this.db.list('prodotti').push(prodotto);
    // });
  }
  
  getProdottiFromFirebase(){
    this.itemsRef.snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({...c.payload.val()})
          )
        )
    ).subscribe(prodotti =>{
      prodotti.forEach(prodotto => {
        let jsonObj: any = JSON.stringify(prodotto);
        let articolo: Prodotto=JSON.parse(jsonObj);
        this.prodotti.push(articolo);
      });
    });
  }

  getListaProdotti(){
    return this.prodotti;
  }
}
