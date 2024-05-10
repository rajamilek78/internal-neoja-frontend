import { Component } from '@angular/core';
import { CodeDialogueComponent } from '../code-dialogue/code-dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private dialogue: MatDialog) {}

  openCodeDialogue(): void {
    const dialogueRef = this.dialogue.open(CodeDialogueComponent, {
      width: '450px',
    });
  }
}
