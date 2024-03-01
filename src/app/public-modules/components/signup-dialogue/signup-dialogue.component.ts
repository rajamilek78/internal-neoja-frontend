import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RouteConstant } from '@app/helpers/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-dialogue',
  templateUrl: './signup-dialogue.component.html',
  styleUrl: './signup-dialogue.component.scss',
})
export class SignupDialogueComponent {
  constructor(
    private dialog: MatDialogRef<SignupDialogueComponent>,
    private router: Router
  ) {}

  openContactUs() {
    this.router.navigate([RouteConstant.CONTACT_US_PAGE]);
    this.close()
  }
  close (){
    this.dialog.close();
  }
}
