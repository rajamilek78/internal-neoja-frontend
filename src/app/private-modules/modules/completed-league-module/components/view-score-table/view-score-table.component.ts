import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CompletedLeagueService } from '../../services/completed-league.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LeaguemanageService, SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { ActivatedRoute } from '@angular/router';
import { RoundScore } from '@app/helpers/models/score.model';
import { KeyValue, Location } from '@angular/common';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LeagueService } from '@app/private-modules/modules/create-league-module/services/league.service';

@Component({
  selector: 'app-view-score-table',
  templateUrl: './view-score-table.component.html',
  styleUrl: './view-score-table.component.scss',
})
export class ViewScoreTableComponent implements OnInit, OnDestroy {
  @ViewChild('cumulativeTableSort') cumulativeTableSort!: MatSort;
  @ViewChild('individualTableSort') individualTableSort!: MatSort;
  userDetailSub$!: Subscription;
  selectedLeague$!: Subscription;
  userDetail!: UserModel | null;
  selectedClubID!: string;
  leagueID!: string;
  leagueRoundWiseScores: any = {};
  leagueRoundWiseArray: any[] = [];
  leagueName!: string;
  sortedScore: any;
  individualScores: any[] = [];
  cumulativeScores: any[] = [];
  sortedCumulative: any[] = [];
  sortedIndividual: any[] = [];
  selectedLeagueId: any;
  selectedLeagueName: any;
  header: any;
  rawData: any;

  constructor(
    private completedLeagueService: CompletedLeagueService,
    private sharedUserService: SharedUserService,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private leaguemanageService: LeaguemanageService,
    public location: Location
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedClubID = params['clubId'];
      this.leagueID = params['leagueID'];
    });
    this.userSubscriber();
    this.onLeagueSelect();
    // this.bindLeagueScore();
    // this.bindLeagueName();
    // this.handleLeagueScore(leagueRoundWiseScores)
    // this.sortedCumulative[0] = this.cumulativeScores[0]
    // this.sortedIndividual[0] = this.individualScores[0]
  }
  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
    if (this.selectedLeague$) {
      this.selectedLeague$.unsubscribe();
    }
  }

  onLeagueSelect() {
    this.selectedLeague$ = this.leaguemanageService.selectedLeague$.subscribe(
      (selectedLeagueId: any) => {
        if (selectedLeagueId && selectedLeagueId.id) {
          console.log(selectedLeagueId);
          this.selectedLeagueId = selectedLeagueId.id;
          console.log(this.selectedLeagueId);
          this.selectedLeagueName = selectedLeagueId.name;
          this.bindLeagueScore();
          this.bindLeagueName();
        }
      }
    );
  }

  onBack = () => {
    this.location.back();
  };

  bindLeagueName = () => {
    const urlString = `${this.selectedClubID}/${this.selectedLeagueId}`;
    this.leagueService.getLeagueById(urlString).subscribe({
      next: (res) => {
        this.leagueName = res.header.name;
      },
      error: (err) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  };

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        if (this.userDetail) {
          // this.selectedClubID = this.userDetail.club_id;
        }
      });
  };

  handleLeagueScore = (res) => {
    this.rawData = res;
    this.leagueRoundWiseScores = res.league_score_details;
    // debugger;
    this.leagueRoundWiseArray = Object.keys(this.leagueRoundWiseScores)
      .map((e) => {
        return { round: e, scores: this.leagueRoundWiseScores[e] };
      })
      .reverse();
    this.cumulativeScores.push(
      this.leagueRoundWiseArray[0]?.scores.cumulative || []
    );
    this.individualScores.push(
      this.leagueRoundWiseArray[0]?.scores.cumulative || []
    );
    setTimeout(() => {
      this.onMatCumulativeSortChange(this.cumulativeTableSort, 0);
      this.onMatIndividualSortChange(this.individualTableSort, 0);
    }, 100);
  };

  bindLeagueScore() {
    const urlString = `${this.selectedClubID}/${this.selectedLeagueId}`;
    this.completedLeagueService.getLeagueScores(urlString).subscribe({
      next: (res: any) => {
        this.handleLeagueScore(res);
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }

  onSelectTabChange = (event: MatTabChangeEvent) => {
    this.cumulativeScores[event.index] =
      this.leagueRoundWiseArray[event.index]?.scores?.cumulative || [];
    this.individualScores[event.index] =
      this.leagueRoundWiseArray[event.index]?.scores?.individual || [];
    this.cumulativeTableSort.active = 'rating';
    this.cumulativeTableSort.direction = 'desc';
    this.onMatCumulativeSortChange(this.cumulativeTableSort, event.index);
    this.onMatIndividualSortChange(this.individualTableSort, event.index);
  };

  onMatCumulativeSortChange(event: MatSort, idx: number): void {
    this.sortedCumulative[idx] = this.sortData(
      event,
      this.cumulativeScores[idx]
    );
  }

  onMatIndividualSortChange(event: MatSort, idx: number): void {
    this.sortedIndividual[idx] = this.sortData(
      event,
      this.individualScores[idx]
    );
  }

  sortData(sort: Sort, players: any) {
    if (!sort.active || sort.direction === '') {
      return players;
    }
    return players.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'player':
          return this.compare(a.player, b.player, isAsc);
        case 'rating':
          return this.compare(+a.weighted_rating, +b.weighted_rating, isAsc);
        case 'points_scored':
          return this.compare(+a.points_scored, +b.points_scored, isAsc);
        case 'points_won_percent':
          return this.compare(
            +a.points_won_percent,
            +b.points_won_percent,
            isAsc
          );
        case 'games_played_percent':
          return this.compare(
            +a.games_played_percent,
            +b.games_played_percent,
            isAsc
          );
        case 'games_won':
          return this.compare(+a.games_won, +b.games_won, isAsc);
        case 'games_lost':
          return this.compare(+a.games_lost, +b.games_lost, isAsc);
        case 'games_won_percent':
          return this.compare(
            +a.games_won_percent,
            +b.games_won_percent,
            isAsc
          );
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

  sortRounds = (
    a: KeyValue<string, RoundScore>,
    b: KeyValue<string, RoundScore>
  ): number => {
    return parseInt(a.key) - parseInt(b.key);
  };

  onClickDownload() {
    if (
      this.rawData &&
      this.rawData.header.scorecard_pdf_public_url &&
      this.rawData.header.scorecard_pdf_public_url
    ) {
      window.open(this.rawData.header.scorecard_pdf_public_url, '_blank');
    } else {
      console.log('Round PDF URL not found or format1 is empty.');
    }
  }
}
