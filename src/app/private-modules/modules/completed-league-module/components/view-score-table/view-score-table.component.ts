import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompletedLeagueService } from '../../services/completed-league.service';
import { SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { ActivatedRoute } from '@angular/router';
import { RoundScore } from '@app/helpers/models/score.model';
import { KeyValue, Location } from '@angular/common';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { Sort } from '@angular/material/sort';
import { LeagueService } from '@app/private-modules/modules/create-league-module/services/league.service';
import { generateRandomPlayer } from '@app/helpers/functions';

@Component({
  selector: 'app-view-score-table',
  templateUrl: './view-score-table.component.html',
  styleUrl: './view-score-table.component.scss',
})
export class ViewScoreTableComponent implements OnInit, OnDestroy{
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  selectedClubID!: string;
  leagueID!: string;
  leagueScores: any = {};
  leagueName!: string;

  constructor(
    private completedLeagueService: CompletedLeagueService,
    private sharedUserService: SharedUserService,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedClubID = params['clubId'];
      this.leagueID = params['leagueID'];
    });
    this.getLeagueScore();
    this.getLeagueName();
    }

  onBack = () => {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
  getLeagueName = () => {
    const urlString = `${this.selectedClubID}/${this.leagueID}`;
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

  getLeagueScore() {
    const urlString = `${this.selectedClubID}/${this.leagueID}`;
    this.completedLeagueService.getLeagueScores(urlString).subscribe({
      next: (res: any) => {
        this.leagueScores = res;
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  sortRounds = (
    a: KeyValue<string, RoundScore>,
    b: KeyValue<string, RoundScore>
  ): number => {
    return parseInt(a.key) - parseInt(b.key);
  };

  sortData(sort: Sort, players :any[]) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    players = players.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'player':
          return this.compare(a.player, b.player, isAsc);
        case 'rating':
          return this.compare(+a.weighted_rating, +b.weighted_rating, isAsc);
        case 'points_scored':
          return this.compare(+a.points_scored, +b.points_scored, isAsc);
        case 'points_won_percent':
          return this.compare(+a.points_won_percent, +b.points_won_percent, isAsc);
        case 'games_played_percent':
          return this.compare(+a.games_played_percent, +b.games_played_percent, isAsc);
        case 'games_won':
          return this.compare(+a.games_won, +b.games_won, isAsc);
        case 'games_lost':
          return this.compare(+a.games_lost, +b.games_lost, isAsc);
        case 'games_won_percent':
          return this.compare(+a.games_won_percent, +b.games_won_percent, isAsc);
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

}
