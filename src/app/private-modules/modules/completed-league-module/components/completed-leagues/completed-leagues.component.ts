import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, SharedService } from '../../../../../core';
import { CompanyModel } from '@app/helpers/models/company.model';
import { MatDialog } from '@angular/material/dialog';
import { LockDataDialogueComponent } from '../../../league-module/components/lock-data-dialogue/lock-data-dialogue.component';
import { Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { CompletedLeagueService } from '../../services/completed-league.service';
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
  roundID = "";

  selectedLeague!: string;
  companies: { [key: string]: { name: string; description: string } } = {};
  newCompanies!: CompanyModel[];
  clubs: { [key: string]: { name: string; phone: string; address: any } } = {};
  // clubs : any;
  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private sharedUserService: SharedService,
    private completedLeagueService: CompletedLeagueService
  ) {}

  ngOnInit(): void {
    // this.getAllCompanies();
    this.userSubscriber();
    this.getAllLeagues();
    // this.getAllRounds();
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
      console.log('the dialogue is closed now');
    });
  }
  // To view score
  viewScore() {
    this.router.navigate([
      RouteConstant.VIEW_SCORES_ROUTE,
      { leagueID: this.selectedLeague },
    ]);
  }
  // To Update Score
  edit(roundID?) {
    this.router.navigate([RouteConstant.LEAGUE_CONTAINER, { isEdit: true, roundID : roundID, leagueID: this.selectedLeague}]);
  }
  // Subcribe loggedIn user's Details
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
        if (this.userDetail) {
          const companyIDs = this.userDetail.owned_companies;
          const clubIDs = this.userDetail.owned_clubs;
          this.selectedClubID = clubIDs[0];
          this.selectedCompanyID = companyIDs[0];
        }
      });
  };
  // To get list of leagues
  getAllLeagues() {
    const companyID = this.userDetail?.owned_companies;
    const clubID = this.userDetail?.owned_clubs;
    this.companyIDClubIDSTr = `${companyID}/${clubID}`;
    const companyIDclubIDStr = `${this.companyIDClubIDSTr}/all`;
    this.commonService.getAllLeagues(`${companyIDclubIDStr}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map((key) => ({
          id: key,
          name: res[key].name,
        }));
        this.selectedLeague = this.leagues[0].id;
        this.getAllRounds();
        console.log(this.leagues);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  // To get list of Rounds for selected Company & Club
  getAllRounds() {
    const urlString = `${this.companyIDClubIDSTr}/${this.selectedLeague}/all`;
    this.completedLeagueService.getAllRounds(urlString).subscribe({
      next: (res: any) => {
        if (res) {
          this.rounds = Object.keys(res).map((key) => ({
            roundNumber: key,
            roundDetails: res[key],
          }));
          console.log(this.rounds); // Log the rounds data here
        } else {
          console.log('No rounds data received');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getAllCompanies() {
    this.commonService.getAllCompanies().subscribe({
      next: (resp: any) => {
        // format change
        // [{
        //   id:'DLF',
        //   name:'test',
        //   description:'test',
        // }]
        this.companies = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getAllClubs(companyID: string) {
    this.commonService.getAllClubs(`${companyID}/all`).subscribe({
      next: (resp: any) => {
        this.clubs = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
