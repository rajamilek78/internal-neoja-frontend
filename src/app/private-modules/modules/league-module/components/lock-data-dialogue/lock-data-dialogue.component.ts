import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lock-data-dialogue',
  templateUrl: './lock-data-dialogue.component.html',
  styleUrl: './lock-data-dialogue.component.scss'
})
export class LockDataDialogueComponent {
  constructor ( private router : Router, private dialogeref : MatDialogRef<LockDataDialogueComponent>){}

  lockRound(){
// this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
this.router.navigate(['players-league/completed-leagues']);
this.close();
  }
close (){
  this.dialogeref.close();
}
}
