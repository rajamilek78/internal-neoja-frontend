import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateLeagueDialogComponent } from '../create-league-dialog/create-league-dialog.component';
import { CommonService, SharedService, SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { Sort } from '@angular/material/sort';
import { SnackBarService } from '@app/core/services/snackbar.service';

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
  sort: Sort = {active: 'active', direction: 'asc'};
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private sharedUserService: SharedUserService,
    private snackbarService : SnackBarService,
    private sharedService: SharedService
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
        case 'schedule':
          return this.compare(new Date(a.start_date).toString(), new Date(b.start_date).toString(), isAsc);
        case 'duprRec':
          return this.compare(a.dupr_recorded, b.dupr_recorded, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'doubles':
          return this.compare(a.doubles, b.doubles, isAsc);
        case 'active':
          return this.compare(b.active, a.active, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a === 'string' && typeof b === 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  
// To subscribe loggedin user details
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          this.clubID = this.userDetail?.club_id;
        }
      });
  };

  

  // To get all league's list
  getAllLeagues() {
    const urlString = `${this.clubID}`
    this.commonService.getAllLeagues(urlString).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map(id => ({id, ...res[id]}));
        this.sortedLeague = this.leagues.slice();
        this.sortData(this.sort)
        },
      error: (err: any) => {
        const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
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
