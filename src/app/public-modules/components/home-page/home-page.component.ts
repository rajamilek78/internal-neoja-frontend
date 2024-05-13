import { Component } from '@angular/core';
import { CodeDialogueComponent } from '../code-dialogue/code-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private dialogue: MatDialog, private router: Router) {}

  openCodeDialogue(card: string): void {
    const dialogueRef = this.dialogue.open(CodeDialogueComponent, {
      width: '450px',
      data: { card: card },
    });
  }
}
