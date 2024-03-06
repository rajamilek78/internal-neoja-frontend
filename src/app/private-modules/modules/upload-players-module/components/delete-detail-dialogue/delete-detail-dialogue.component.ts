import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-detail-dialogue',
  templateUrl: './delete-detail-dialogue.component.html',
  styleUrl: './delete-detail-dialogue.component.scss',
})
export class DeleteDetailDialogueComponent {
  roundCount! : number;
  players: any;
  index: number;
  playerName!:string;
  
  constructor(private dialog: MatDialogRef<DeleteDetailDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roundCount = data.roundCount;
    this.players = data.players;
    this.playerName = data.playerName;
    this.index = data.index; // Assign index value from data
  }
  delete(index) {
    this.players.removeAt(index);
    //this.dialog.close();
    this.close();
  }
  close(){
    this.dialog.close();
  }
}