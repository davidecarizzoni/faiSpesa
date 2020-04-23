import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  user: User;
  
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
  }

}
