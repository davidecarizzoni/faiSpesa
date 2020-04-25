import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista.interface';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { ListaService } from 'src/app/services/lista.service';
import { map } from 'rxjs/operators';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  username = sessionStorage.getItem('username');
  admin=sessionStorage.getItem('privilege');
  isAdmin:boolean;

  itemsRef: AngularFireList<any>;
  liste: Lista[] = [];
  listeUtente: Lista[] = [];
  items: Observable <any[]>;
  
  
  constructor(private prodottiService:ProdottiService,public db:AngularFireDatabase,private listService:ListaService, private listComponent:ListComponent) {
    this.admin==="admin" ? this.isAdmin=true : this.isAdmin=false;
  }

  ngOnInit(): void { 
    this.liste = [];
  }

  view(){
    this.listComponent.getListsFromFirebase();
  }

}
