import { Component, OnInit } from '@angular/core';
import { CompletedLeagueService } from '../../services/completed-league.service';
import { SharedUserService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { ActivatedRoute } from '@angular/router';
import { RoundScore, ScoreModel } from '@app/helpers/models/score.model';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-view-score-table',
  templateUrl: './view-score-table.component.html',
  styleUrl: './view-score-table.component.scss'
})
export class ViewScoreTableComponent implements OnInit{
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  //selectedCompanyID!: string;
  selectedClubID!: string;
  leagueID!: string;
  leagueScores!:ScoreModel | null;
  constructor ( 
    private completedLeagueService : CompletedLeagueService,
    private sharedUserService : SharedUserService,
    private route : ActivatedRoute
    ){}
  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.leagueID = params['leagueID'];
    });
    console.log("this is selected league id ",this.leagueID);
    this.userSubscriber();
    this.getLeagueScore();
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
        if (this.userDetail) {
          //const companyIDs = this.userDetail.owned_companies;
          const clubIDs = this.userDetail.owned_clubs;
          this.selectedClubID = this.userDetail.club_id;
          //this.selectedCompanyID = companyIDs[0];

        }
      });
  };

  getLeagueScore(){
    
    const urlString = `${this.selectedClubID}/${this.leagueID}`
    this.completedLeagueService.getLeagueScores(urlString).subscribe({
      next : (res : any)=>{
      
        this.leagueScores = res;
        console.log("this is response from view score",res);
        
        console.log(this.leagueScores);
        },
        error : (err : any)=>{
          console.log(err);
        }
    })
  }
  sortRounds = (a: KeyValue<string,RoundScore>, b: KeyValue<string,RoundScore>): number => {
    return parseInt(a.key) - parseInt(b.key);
  }
  
  
  // handleResponse(res){

  // }


}
