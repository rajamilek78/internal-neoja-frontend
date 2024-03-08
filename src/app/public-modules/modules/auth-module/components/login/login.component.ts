import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteConstant } from "@app/helpers/constants";
import { FormBaseComponent } from "@app/utility/components";
import { UserAuthService } from '../../services';
import { SnackBarService } from '@app/core/services/snackbar.service';

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
    private snackbarService : SnackBarService,
    private snackbar : MatSnackBar
  ) {
    super(fb)
  }

  ngOnInit(): void {
    this.loginForm = this.createForm({
      id: ['aminraiyani@gmail.com', [Validators.required]],
      password: ['abc@123', Validators.required],
      
    })
  }
  handleLoginResponse = (response) => {
    this.userAuthService.handleAuthResponse(response);
    this.router.navigate([RouteConstant.UPLOAD_PLAYER_CONTAINER]);
  }
  

  onLoginSubmit(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      // const { email, password } = loginForm.value;
      // const emailPasswordStr = `${email}/${password}`;
      this.userAuthService.logIn(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.handleLoginResponse(res);
        },
        error: (err: any) => {
          console.log(err);
          const message = err.error.message
          this.snackbarService.setSnackBarMessage(message);
          // this.snackbar.open(`${err.error.message}`, 'Close',{
          //   duration : 5000,
          //   panelClass : ['mat-toolbar','mat-warn']
          // });
        }
      })
    }
  }
}