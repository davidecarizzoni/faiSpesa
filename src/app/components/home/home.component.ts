import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = sessionStorage.getItem('username');

  constructor(private router:Router) { }

  ngOnInit(): void {}

  logout(){
    if(this.username != null){
      sessionStorage.clear();
      window.alert("Logout effettuato con successo");
      this.router.navigateByUrl('/home');
    }else{
      window.alert("Nessun utente registrato");
    }
  }

  isAdmin(): boolean {
    if(sessionStorage.getItem('privilege') === 'admin')
      return true;
    else 
      return false;
  }

}
