import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logsign',
  templateUrl: './logsign.component.html',
  styleUrls: ['./logsign.component.css']
})

export class LogsignComponent implements OnInit, AfterViewInit {

  constructor(private loginService: LoginService, private elementRef:ElementRef) { 
    loginService.getUsersFromFirebase();
  }

  
  private signUp;
  private signIn;
  private container;
 
  
  
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

  onSubmitSignUp(){
    console.log("Sign un pressed");
    this.container.classList.add("right-panel-active");
  }


  onSubmitSignIn(){
    
  }
  
  ngOnInit(): void {
  }

}
