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
      /*{nome: 'RedBull', descrizione:'Red Bull è una bevanda energetica analcolica di colore ambrato brillante, con taurina e caffeina, è gassata ed ha un gusto leggermente dolce fruttato tendente alla fragola.', prezzo:4, img:''},
      {nome: 'Riso basmati', descrizione:'Il riso basmati è una varietà di riso a chicco lungo dal sapore caratteristico e molto profumata, adatta a preparare piatti di ispirazione etnica e non solo', prezzo:2, img:''},
      {nome: 'Penne integrali barilla', descrizione:'Le Penne Rigate Integrali Barilla, dal diametro ridotto e fonte naturale di fibre, si caratterizzano per la loro proverbiale capacità di trattenere il condimento.', prezzo:1, img:''},
      {nome: 'Hamburger', descrizione:'Polpetta di carne macinata, compressa a formare una specie di medaglione, che si mangia cotta alla griglia o in padella, spesso dentro un panino.', prezzo:5, img:''},
      {nome: 'I rustici Giovanni Rana', descrizione:'La linea di pasta ripiena in cui ritrovi tutto il piacere della tradizione. Grazie a SFOGLIAGREZZA, il processo brevettato da Giovanni Rana, la pasta è corposa e ruvida per trattenere al meglio il sugo.', prezzo:1.50, img:''},
      {nome: 'Parmigiano reggiano', descrizione:'Il Parmigiano Reggiano è un formaggio a pasta dura DOP, prodotto con latte vaccino crudo, parzialmente scremato per affioramento, senza l aggiunta di additivi', prezzo:8, img:''},*/
  ]

  itemsRef: AngularFireList<Prodotto> = null;
  itemValue: Prodotto = null;
  items: Observable <any[]>;
  utenti : any;
  
  constructor(private router:Router,public db:AngularFireDatabase) {
    this.itemsRef=db.list('/prodotti');
    /*this.items = db.list('prodotti').valueChanges();
    this.prodotti.forEach(prodotto => {
      this.db.list('prodotti').push(prodotto);
    });*/
  }
  
  getUsersFromFirebase(){
    this.itemsRef.snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({...c.payload.val()})
          )
        )
    ).subscribe(prodotti =>{
      prodotti.forEach(user => {
        let jsonObj: any = JSON.stringify(user);
        let utente: Prodotto=JSON.parse(jsonObj);
        this.prodotti.push(utente);
      });
    });
  }

  getListaProdotti(){
    return this.prodotti;
  }
}
