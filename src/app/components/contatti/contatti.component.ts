import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  send(){
    window.alert("Messaggio inviato con successo");
    this.router.navigateByUrl('/home');
  }
}
