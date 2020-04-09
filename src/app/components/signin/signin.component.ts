import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormArray,Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';

import {AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signForm: FormGroup;
  
  //FIREBASE
  itemValue: User = null;
  items: Observable <any[]>;


  constructor(private login:LoginService,private fb: FormBuilder,private router: Router, public db:AngularFireDatabase) { 
    this.signForm = this.fb.group({
      nomeCognome: ['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password: ['',Validators.required],
    });
    
    this.items = db.list('users').valueChanges();
  }

  ngOnInit(): void {
  }

  onSubmit(user){
    this.router.navigateByUrl("/login");
    this.login.add(user);

    this.db.list('users').push(user);
    this.itemValue = null;
  }
  
}
