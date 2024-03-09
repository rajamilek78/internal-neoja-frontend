import { Component, OnInit } from '@angular/core';
import { CompletedLeagueService } from '../../services/completed-league.service';
import { SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { ActivatedRoute } from '@angular/router';
import { RoundScore, ScoreModel } from '@app/helpers/models/score.model';
import { KeyValue } from '@angular/common';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-view-score-table',
  templateUrl: './view-score-table.component.html',
  styleUrl: './view-score-table.component.scss',
})
export class ViewScoreTableComponent implements OnInit {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  //selectedCompanyID!: string;
  selectedClubID!: string;
  leagueID!: string;
  // leagueScores!: ScoreModel;
  leagueScores!: any;
  SortedLeagueScores!: any;
  constructor(
    private completedLeagueService: CompletedLeagueService,
    private sharedUserService: SharedUserService,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueID = params['leagueID'];
    });
    console.log('this is selected league id ', this.leagueID);
    this.userSubscriber();
    this.getLeagueScore();
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        // console.log(this.userDetail);
        if (this.userDetail) {
          //const companyIDs = this.userDetail.owned_companies;
          const clubIDs = this.userDetail.owned_clubs;
          this.selectedClubID = this.userDetail.club_id;
          //this.selectedCompanyID = companyIDs[0];
        }
      });
  };

  getLeagueScore() {
    const urlString = `${this.selectedClubID}/${this.leagueID}`;
    this.completedLeagueService.getLeagueScores(urlString).subscribe({
      next: (res: any) => {
        this.leagueScores = res;
        // this.leagueScores = Object.entries(res);
        console.log(res);
        // this.leagueScores = Object.entries(res);
        // this.leagueScores = Object.keys(res).map(id => ({id, ...res[id]}));
        // this.SortedLeagueScores = this.leagueScores.slice();
        console.log('this is response from view score', this.leagueScores);
        // console.log(this.leagueScores);
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
        console.log(err);
      },
    });
  }
  sortRounds = (
    a: KeyValue<string, RoundScore>,
    b: KeyValue<string, RoundScore>
  ): number => {
    return parseInt(a.key) - parseInt(b.key);
  };

  sortData(sort: Sort) {
    const data = this.SortedLeagueScores.slice();
    if (!sort.active || sort.direction === '') {
      this.SortedLeagueScores = data;
      return;
    }

    this.SortedLeagueScores = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.key, b.key, isAsc);
        case 'rating':
          return this.compare(a.value.weighted_rating, b.value.weighted_rating, isAsc);
        case 'points_scored':
          return this.compare(a.value.points_scored, b.value.points_scored, isAsc);
        // case 'points_possible':
        //   return this.compare(a.value.points_possible, b.value.points_possible, isAsc);
        case 'points_won_percent':
          return this.compare(a.value.points_won_percent, b.value.points_won_percent, isAsc);
        // case 'games_played':
        //   return this.compare(a.value.games_played, b.value.games_played, isAsc);
        // case 'games_possible':
        //   return this.compare(a.value.games_possible, b.value.games_possible, isAsc);
        case 'games_played_percent':
          return this.compare(a.value.games_played_percent, b.value.games_played_percent, isAsc);
        case 'games_won':
          return this.compare(a.value.games_won, b.value.games_won, isAsc);
        case 'games_lost':
          return this.compare(a.value.games_lost, b.value.games_lost, isAsc);
        case 'games_won_percent':
          return this.compare(a.value.games_won_percent, b.value.games_won_percent, isAsc);
        // case 'game_history':
        //   return this.compare(a.value.win_lose_history, b.value.win_lose_history, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // handleResponse(res){

  // }
}
