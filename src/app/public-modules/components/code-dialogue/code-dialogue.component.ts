import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-code-dialogue',
  templateUrl: './code-dialogue.component.html',
  styleUrl: './code-dialogue.component.scss',
})
export class CodeDialogueComponent {
  constructor(private dialogue: MatDialogRef<CodeDialogueComponent>) {}

  close() {
    this.dialogue.close();
  }
}
