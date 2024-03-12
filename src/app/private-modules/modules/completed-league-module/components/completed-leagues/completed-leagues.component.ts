import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService,SharedService } from '@app/core';
import { CompanyModel } from '@app/helpers/models/company.model';
import { MatDialog } from '@angular/material/dialog';
import { LockDataDialogueComponent } from '../../../league-module/components/lock-data-dialogue/lock-data-dialogue.component';
import { Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { CompletedLeagueService } from '../../services/completed-league.service';
import { SnackBarService } from '@app/core/services/snackbar.service';
@Component({
  selector: 'app-completed-leagues',
  templateUrl: './completed-leagues.component.html',
  styleUrl: './completed-leagues.component.scss',
})
export class CompletedLeaguesComponent implements OnInit, OnDestroy {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  rounds: any[] = [];
  companyIDClubIDSTr = '';
  selectedCompanyID!: string;
  selectedClubID!: string;
  roundID = '';
  selectedLeague!: string;
  companies: { [key: string]: { name: string; description: string } } = {};
  newCompanies!: CompanyModel[];
  clubs: { [key: string]: { name: string; phone: string; address: any } } = {};
  selectedLeagueName!: string;
  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private sharedUserService: SharedService,
    private snackbarService: SnackBarService,
    private completedLeagueService: CompletedLeagueService
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
  // To open dialog to lock Round
  openDialogue(): void {
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: '450px',
    });
    dialogueRef.afterClosed().subscribe((result) => {
    });
  }
  // To view score
  viewScore() {
    this.router.navigate([
      RouteConstant.VIEW_SCORES_ROUTE,
      { clubId: this.selectedClubID, leagueID: this.selectedLeague },
    ]);
  }
  // To Update Score
  edit(roundID?) {
    this.router.navigate([
      RouteConstant.LEAGUE_CONTAINER,
      {
        clubId: this.selectedClubID,
        isEdit: true,
        roundID: roundID,
        leagueID: this.selectedLeague,
        leagueName: this.selectedLeagueName,
      },
    ]);
  }
  // Subcribe loggedIn user's Details
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        if (this.userDetail) {
          this.selectedClubID = this.userDetail.club_id;
        }
      });
  };
  // To get list of leagues
  getAllLeagues() {
    const urlString = `${this.selectedClubID}`;
    this.commonService.getAllLeagues(`${urlString}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map((key) => ({
          id: key,
          name: res[key].name,
        }));
        this.selectedLeague = this.leagues[0].id;
        this.selectedLeagueName = this.leagues[0].name;
        this.getAllRounds();
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  onLeagueChange() {
    const selectedLeague = this.leagues.find(
      (league) => league.id === this.selectedLeague
    );
    if (selectedLeague) {
      this.getAllRounds();
      this.selectedLeagueName = selectedLeague.name;
    } else {
      this.selectedLeagueName = '';
    }
  }
// To get data of all rounds in a league.
  getAllRounds() {
    const urlString = `${this.selectedClubID}/${this.selectedLeague}/all`;
    this.completedLeagueService.getAllRounds(urlString).subscribe({
      next: (res: any) => {
        if (res) {
          this.rounds = Object.keys(res).map((key) => ({
            roundNumber: Number(key), // Convert key to number if needed
            roundDetails: res[key],
            scoreLocked: res[key].header?.score_locked, // Initialize scoreLocked to false for each round
          }));
          this.allRoundsLocked();
        } else {
          this.rounds = [];
        }
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  allRoundsLocked() {
    if (this.rounds && this.rounds.length > 0) {
      return this.rounds.every((round) => round.scoreLocked);
    }
    return false;
  }
  lockScore(roundID?) {
    const urlString = `${this.selectedClubID}/${this.selectedLeague}/${roundID}`;
    this.commonService.lockScore(urlString).subscribe({
      next: (res: any) => {
        this.getAllRounds();
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
        console.error(err);
      },
    });
  }
}
