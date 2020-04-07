import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { FormStyle } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: User[] = [
    {email: "email@gmail.com",username: "andrea",password:"123",admin:true},
    {email: "email@gmail.com",username: "davide",password:"123",admin:true},
    {email: "email@gmail.com",username: "marco",password:"123",admin:false}
  ]

  constructor(private router:Router) {}

  isPres(email: string,username: string,password:string): boolean{
    let controllo=false;
    this.users.forEach(element => {
      if(element.email==email &&element.username==username && element.password==password){
        element.admin === true ? sessionStorage.setItem('privilege','admin') : sessionStorage.setItem('privilege','user');
        controllo=true;
      }
    });
    return controllo;
  }

  eseguiLogin(email: string,username: string, password:string){
    if (this.isPres(email,username,password)) {
      sessionStorage.setItem('user', username);
      this.router.navigateByUrl('/list');
    }
    else{
      window.alert('Utente non trovato!');
      // let name = document.querySelector('#username');
      // name.setAttribute('value','')
    }
  }
  add(user){
    user.admin=false;
    this.users.push(user);
    console.log(this.users);
  }
}
