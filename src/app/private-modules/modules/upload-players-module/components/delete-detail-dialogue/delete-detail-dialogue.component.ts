import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-detail-dialogue',
  templateUrl: './delete-detail-dialogue.component.html',
  styleUrl: './delete-detail-dialogue.component.scss',
})
export class DeleteDetailDialogueComponent {
  roundCount!: number;
  playerName!: string;

  constructor(private dialog: MatDialogRef<DeleteDetailDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roundCount = data.roundCount;
    this.playerName = data.playerName;
  }

  delete(): void {
    this.close(true);
  }

  close(isAccepted: boolean = false): void {
    this.dialog.close(isAccepted);
  }
}