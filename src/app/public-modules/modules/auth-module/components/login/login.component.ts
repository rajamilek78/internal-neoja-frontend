import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteConstant } from "@app/helpers/constants";
import { FormBaseComponent } from "@app/utility/components";
import { UserAuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassWord = true;

  constructor(private router: Router,
    fb: FormBuilder,
    private userAuthService: UserAuthService,
    private snackbar : MatSnackBar
  ) {
    super(fb)
  }

  ngOnInit(): void {
    this.loginForm = this.createForm({
      email: ['aminraiyani@gmail.com', [Validators.required]],
      password: ['abc@123', Validators.required],
      
    })
    console.log(Date.now()/1000);
  }
  handleLoginResponse = (response) => {
    this.userAuthService.handleAuthResponse(response);
    this.router.navigate([RouteConstant.UPLOAD_PLAYER_CONTAINER]);
  }
  

  onLoginSubmit(loginForm: FormGroup) {
    if (this.onSubmit(loginForm)) {
      const { email, password } = loginForm.value;
      const emailPasswordStr = `${email}/${password}`;
      this.userAuthService.logIn(emailPasswordStr).subscribe({
        next: (res: any) => {
          this.handleLoginResponse(res);
        },
        error: (err: any) => {
          console.log(err);
          this.snackbar.open('Invalid Credentials', 'Close',{
            duration : 5000,
            panelClass : ['mat-toolbar','mat-warn']
          });
        }
      })
    }
  }
}