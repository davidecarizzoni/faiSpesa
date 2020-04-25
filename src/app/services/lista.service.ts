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
    
    this.liste=[];
  }
}
