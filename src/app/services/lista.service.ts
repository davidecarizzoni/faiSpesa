import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private lista: Lista;
  itemsRef: AngularFireList<Lista> = null;
  itemValue: Lista = null;


  constructor(public db:AngularFireDatabase) { 
    this.itemsRef=db.list('/lista');
  }


}
