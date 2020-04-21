import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private lista: Lista;
  itemsRef: AngularFireList<Lista> = null;
  itemValue: Lista = null;
  prova : any;
  liste: Lista[];

  constructor(public db:AngularFireDatabase) { 
    
  }

 
}
