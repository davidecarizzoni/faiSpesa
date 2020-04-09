import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder,FormArray,Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { 
    loginService.getUsersFromFirebase();
  }

  ngOnInit(): void {
  }

  login(email:string, username:string, password:string){
    this.loginService.eseguiLogin(email,username,password);
  }

}
