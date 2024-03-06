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
  clubID!: string ;
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
        if(this.userDetail){
        this.clubID = this.userDetail?.club_id;
      }
      });
  };
  // To get all league's list
  getAllLeagues() {
    const urlString = `${this.clubID}/all`
    this.commonService.getAllLeagues(`${urlString}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map(id => ({id, ...res[id]}));
        console.log(this.leagues);
        },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  // To open dialog to create and edit league.
  openDialogue(leagueID?: any): void {
    const dialogueRef = this.dialog.open(CreateLeagueDialogComponent, {
      width: '450px',
      data: { clubID: this.clubID, leagueID: leagueID },
    });
    dialogueRef.afterClosed().subscribe((result) => {
      this.getAllLeagues(); // to refresh the leagues.
    });
  }
}
