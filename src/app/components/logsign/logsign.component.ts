import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-logsign',
  templateUrl: './logsign.component.html',
  styleUrls: ['./logsign.component.css']
})

export class LogsignComponent implements OnInit, AfterViewInit {

  signForm: FormGroup;
  itemValue: User = null;
  items: Observable <any[]>;

  
  private signUp;
  private signIn;
  private container;
 
  constructor(private loginService: LoginService, private elementRef:ElementRef,private fb: FormBuilder,private router: Router, public db:AngularFireDatabase) { 
    loginService.getUsersFromFirebase();

    this.signForm = this.fb.group({
      nomeCognome: ['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password: ['',Validators.required],
    });
    
    this.items = db.list('users').valueChanges();
  }
  
  ngAfterViewInit(): void {
    this.signUp = this.elementRef.nativeElement.querySelector("#signUp");
    this.signIn = this.elementRef.nativeElement.querySelector("#signIn");
    this.container = this.elementRef.nativeElement.querySelector("#container");

    console.log(this.signUp);
    console.log(this.signIn);
    console.log(this.container);
  }

  login(username:string, password:string){
    this.loginService.eseguiLogin(username,password);
    this.container.classList.remove("right-panel-active");
    
    console.log("Login pressed");
  }

  signin(user){
    this.router.navigateByUrl("/list");
    this.loginService.add(user);

    this.db.list('users').push(user);
    this.itemValue = null;
  }

  switchSignUp(){
    console.log("Sign un pressed");
    this.container.classList.add("right-panel-active");
  }

  switchLogin(){
    this.container.classList.remove("right-panel-active");
  }
  
  ngOnInit(): void { }

}
