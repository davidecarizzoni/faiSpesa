import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private lista: Lista;
  itemsRef: AngularFireList<Lista> = null;
  itemValue: Lista = null;
  prova : any;
  liste: Lista[];
  items: Observable <any[]>;

  constructor(public db:AngularFireDatabase) { 
    this.items = db.list('lists').valueChanges();
  }

  getListsFromFirebase(){
    this.liste=[];
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
      });
    });
    return this.liste;
  }
}
