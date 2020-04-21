import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  username = sessionStorage.getItem('username');
  admin=sessionStorage.getItem('privilege');
  isAdmin:boolean;
  constructor() {
    if(this.admin==="admin"){
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
   }

  ngOnInit(): void {
  }

}
