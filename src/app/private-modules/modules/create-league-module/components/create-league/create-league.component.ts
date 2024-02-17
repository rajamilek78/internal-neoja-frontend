import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateLeagueDialogComponent } from '../create-league-dialog/create-league-dialog.component';
import { CommonService, SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrl: './create-league.component.scss',
})
export class CreateLeagueComponent implements OnInit {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  companyIDclubID = "";
  leagues!: any[];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private sharedUserService: SharedUserService,
  ) {
  }
  ngOnInit(): void {
    this.userSubscriber();
    this.getAllLeagues();
    
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
      });
  };


  getAllLeagues() {
    const companyID = this.userDetail?.owned_companies;
    const clubID = this.userDetail?.owned_clubs;
    this.companyIDclubID = `${companyID}/${clubID}`
    const companyIDclubID_Str = `${this.companyIDclubID}/all`
    this.commonService.getAllLeagues(`${companyIDclubID_Str}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.values(res);
        console.log(this.leagues);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  openDialogue(): void {
    const dialogueRef = this.dialog.open(CreateLeagueDialogComponent, {
      width: '450px',
      data : this.companyIDclubID
    });
    dialogueRef.afterClosed().subscribe((result) => {
      console.log('the dialogue is closed now');
    });
  }
}
