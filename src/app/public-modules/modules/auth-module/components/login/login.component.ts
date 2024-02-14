import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hidePassWord = true;
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['upload']);
  }
}