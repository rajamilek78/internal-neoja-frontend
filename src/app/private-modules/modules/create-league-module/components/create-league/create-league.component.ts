import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateLeagueDialogComponent } from '../create-league-dialog/create-league-dialog.component';
import { CommonService, SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { Sort } from '@angular/material/sort';

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
  sortedLeague! : any[];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private sharedUserService: SharedUserService
  ) {
  }
  ngOnInit(): void {
    this.userSubscriber();
    this.getAllLeagues();
  }
  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
  // To sort table data.
  sortData(sort: Sort) {
    const data = this.leagues.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedLeague = data;
      return;
    }

    this.sortedLeague = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'duprRec':
        case 'schedule':
          return this.compare(new Date(a.start_date).toString(), new Date(b.start_date).toString(), isAsc);
        case 'duprRec':
          return this.compare(a.dupr_recorded, b.dupr_recorded, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'doubles':
          return this.compare(a.doubles, b.doubles, isAsc);
        case 'active':
          return this.compare(a.active, b.active, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
    const urlString = `${this.clubID}`
    this.commonService.getAllLeagues(`${urlString}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map(id => ({id, ...res[id]}));
        this.sortedLeague = this.leagues.slice();
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
