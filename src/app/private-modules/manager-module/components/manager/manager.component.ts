import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {

constructor(
  private router: Router,
) {
 
}
  onBackToMenu = () => {
    this.router.navigate(['']);
  };

}
