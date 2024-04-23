import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, LeaguemanageService, SharedService } from '@app/core';
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
  selectedLeague$!: Subscription;
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
  selectedLeagueId: any;
  sessionID!: string;
  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private sharedUserService: SharedService,
    private snackbarService: SnackBarService,
    private completedLeagueService: CompletedLeagueService,
    private leagueService: LeaguemanageService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userSubscriber();
    //this.getAllLeagues();
    this.onLeagueSelect();
  }

  // Subscribe to selected league changes
  onLeagueSelect() {
    this.selectedLeague$ = this.leagueService.selectedLeague$.subscribe(
      (selectedLeagueId: any) => {
        if (selectedLeagueId && selectedLeagueId.id) {
          this.selectedLeagueId = selectedLeagueId.id;
          this.selectedLeagueName = selectedLeagueId.name;
          this.getAllRounds();
        }
      }
    );
  }
  ngOnDestroy(): void {
     // Unsubscribe from subscriptions
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
    if (this.selectedLeague$) {
      this.selectedLeague$.unsubscribe();
    }
  }
  // To open dialog to lock Round
  openDialogue(): void {
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: '450px',
    });
    dialogueRef.afterClosed().subscribe((result) => { });
  }
  // To view score
  viewScore() {
    this.router.navigate([
      RouteConstant.VIEW_SCORES_ROUTE,
      { clubId: this.selectedClubID, leagueID: this.selectedLeagueId },
    ]);
  }
  // To Update Score
  edit(roundID?) {
    const labelName = this.rounds.find((round) => round.roundNumber === roundID)
      ?.roundDetails.header?.score_locked
      ? 'ViewScore'
      : 'EditScore';
    this.router.navigate([
      RouteConstant.LEAGUE_CONTAINER,
      {
        clubId: this.selectedClubID,
        isEdit: true,
        roundID: roundID,
        leagueID: this.selectedLeagueId,
        leagueName: this.selectedLeagueName,
        labelName: labelName,
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
          this.sessionID = this.userDetail?.session_id
        }
      });
  };
 
  // To get data of all rounds in a league.
  getAllRounds() {
    const urlString = `${this.selectedClubID}/${this.selectedLeagueId}/all`;
    this.completedLeagueService.getAllRounds(urlString).subscribe({
      next: (res: any) => {
        if (res) {
          this.rounds = Object.keys(res).map((key) => ({
            roundNumber: Number(key), // Convert key to number if needed
            roundDetails: res[key],
            scoreLocked: res[key].header?.score_locked,
          }));
          console.log(this.rounds)
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

   // Check if all rounds are locked
  allRoundsLocked() {
    if (this.rounds && this.rounds.length > 0) {
      return this.rounds.every((round) => round.scoreLocked);
    }
    return false;
  }

   // Lock score for a round
  lockScore(roundID?) {
    const urlString = `${this.selectedClubID}/${this.selectedLeagueId}/${roundID}`;
    const body = this.sessionID
    this.commonService.lockScore(urlString, body).subscribe({
      next: (res: any) => {
        this.viewScore();
        this.getAllRounds();
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
        console.error(err);
      },
    });
  }

  // Download round data
  download(roundID?) {
    const round = this.rounds.find((r) => r.roundNumber === roundID);
    if (round && round.roundDetails.round_pdf_urls && round.roundDetails.round_pdf_urls.fixture_format1) {
      window.open(round.roundDetails.round_pdf_urls.fixture_format1, '_blank');
    } else {
      console.log('Round PDF URL not found or empty.');
    }
  }
}
