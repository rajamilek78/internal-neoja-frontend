import { Component, Inject, Input, OnInit, inject, input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { CommonService, SharedService } from '@app/core';

@Component({
  selector: 'app-lock-data-dialogue',
  templateUrl: './lock-data-dialogue.component.html',
  styleUrl: './lock-data-dialogue.component.scss'
})
export class LockDataDialogueComponent implements OnInit{
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  responseData: any;
 
  constructor ( private router : Router, private dialogeref : MatDialogRef<LockDataDialogueComponent>, private sharedService: SharedService,
    private commonservice: CommonService ,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    console.log(this.responseData)
  }
 

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        console.log(this.userDetail);
      });
  };

  // leagueSummary() {
  //   const ownedCompanies = this.userDetail?.owned_companies;
  //   const ownedClubs = this.userDetail?.owned_clubs;
  //   //const name = this.leagueID;
  //   const compnyclubnameStr = `${ownedCompanies}/${ownedClubs}/${name}`;
    

  //   this.commonservice.getLeaguesSummary(compnyclubnameStr).subscribe({
  //     next: (res: any) => {
       
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //     }
  //   });
  // }

  lockRound(){

// this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
this.router.navigate(['players-league/completed-leagues']);
this.close();
  }
close (){
  this.dialogeref.close();
}
}
