import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormArray,Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signForm: FormGroup;
  constructor(private login:LoginService,private fb: FormBuilder,private router: Router) { 
    this.signForm = this.fb.group({
      nomeCognome: '',
      email:'',
      username:'',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(user){
    this.router.navigateByUrl("/login");
    this.login.add(user);
  }
  
}
