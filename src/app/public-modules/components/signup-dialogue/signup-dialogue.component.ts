import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-dialogue',
  templateUrl: './signup-dialogue.component.html',
  styleUrl: './signup-dialogue.component.scss',
})
export class SignupDialogueComponent {
  constructor(private dialog: MatDialogRef<SignupDialogueComponent>) {}
}
