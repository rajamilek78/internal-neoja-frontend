import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    super(fb)
  }

  ngOnInit(): void {
    this.loginForm = this.createForm({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    })
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
        }
      })
    }
  }
}