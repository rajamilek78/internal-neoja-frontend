import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-detail-dialogue',
  templateUrl: './delete-detail-dialogue.component.html',
  styleUrl: './delete-detail-dialogue.component.scss',
})
export class DeleteDetailDialogueComponent {
  constructor(private dialog: MatDialogRef<DeleteDetailDialogueComponent>) {}

  close() {
    this.dialog.close();
  }
}
