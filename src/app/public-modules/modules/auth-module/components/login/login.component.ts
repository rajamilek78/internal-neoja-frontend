import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiManagerService } from '../../../../../core';
import { RouteConstant } from '../../../../../helpers/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  loginForm : any;
  hidePassWord = true;
  constructor(private router: Router, private fb : FormBuilder, private api : ApiManagerService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : [''],
      password : ['']
    })
  }

  login() {
    console.log("login method called");
    
    if(this.loginForm.valid){
      this.api.login(`${this.loginForm.value.email}/${this.loginForm.value.password}`).subscribe(
        {
          next : (res : any)=>{
            console.log(res);
            
          },
          error : (err : any)=>{
            console.log(err);
            
          }
        }
      )
    }
    this.router.navigate([RouteConstant.UPLOAD_PLAYER_CONTAINER]);
  }
}