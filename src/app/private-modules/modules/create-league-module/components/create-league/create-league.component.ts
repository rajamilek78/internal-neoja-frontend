import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class CreateLeagueComponent implements OnInit, OnDestroy {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  companyIDclubID = '';
  leagues!: any[];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private sharedUserService: SharedUserService
  ) {}
  ngOnInit(): void {
    this.userSubscriber();
    this.getAllLeagues();
  }
  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
// To subscribe loggedin user details
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
      });
  };
  // To get all league's list
  getAllLeagues() {
    //const companyID = this.userDetail?.owned_companies;
    const clubID = this.userDetail?.owned_clubs;
    this.companyIDclubID = `${clubID}`;
    const companyIDclubID_Str = `${this.companyIDclubID}/all`;
    this.commonService.getAllLeagues(`${companyIDclubID_Str}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.values(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  // To open dialog to create, edit and delete league
  openDialogue(league?: any): void {
    const dialogueRef = this.dialog.open(CreateLeagueDialogComponent, {
      width: '450px',
      data: { companyIDclubID: this.companyIDclubID, league: league },
    });
    dialogueRef.afterClosed().subscribe((result) => {
      this.getAllLeagues(); // refresh the leagues
    });
  }
}
