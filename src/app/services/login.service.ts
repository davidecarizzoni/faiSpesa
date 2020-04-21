import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { FormStyle } from '@angular/common';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: User[] = [];

  itemsRef: AngularFireList<User> = null;
  utenti : any;
  prova : any;
  
  constructor(private router:Router,public db:AngularFireDatabase) {
    this.itemsRef=db.list('/users');
  }

  isPres(username: string,password:string): boolean{
    let controllo=false;
    this.users.forEach(element => {
      if(element.username==username && element.password==password){
        element.admin === true ? sessionStorage.setItem('privilege','admin') : sessionStorage.setItem('privilege','user');
        controllo=true;
      }
    });
    return controllo;
    
  }

  eseguiLogin(username: string, password:string){
    if (this.isPres(username,password)) {
      sessionStorage.setItem('username', username);
      sessionStorage.getItem('privilege') == 'admin' ? this.router.navigateByUrl('/home') : this.router.navigateByUrl('/list');
    }else{
      window.alert('Utente non trovato!');
    }
  }
  add(user){
    user.admin=false;
    this.users.push(user);
    console.log(this.users);
  }

  getUsersFromFirebase(){
    this.itemsRef.snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({...c.payload.val()})
          )
        )
    ).subscribe(users =>{
      this.prova=users;
      users.forEach(user => {
        let jsonObj: any = JSON.stringify(user);
        let utente: User=JSON.parse(jsonObj);
        this.users.push(utente);
      });
    });
    
  }

}
