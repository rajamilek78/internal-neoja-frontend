import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(){
    const api_key = 'eleagueonlineapis';
    localStorage.setItem('token',api_key);
  }
  title = 'eleague-online';
}
