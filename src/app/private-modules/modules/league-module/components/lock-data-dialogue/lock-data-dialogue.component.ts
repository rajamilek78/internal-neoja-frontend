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
  commonService: any;
  leagueID: any;
  
 
  constructor ( private router : Router, private dialogeref : MatDialogRef<LockDataDialogueComponent>, private sharedService: SharedService,
    private commonservice: CommonService ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){}
  ngOnInit(): void {
    console.log(this.data)
    console.log(this.data.leagueID);
    this.userSubscriber();
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

  lockRound() {
    const bodyData = this.data;
    const ownedCompanies = this.userDetail?.owned_companies;
      const ownedClubs = this.userDetail?.owned_clubs;
      const compnyclubnameStr = `${ownedCompanies}/${ownedClubs}/${this.leagueID}`;
    //   //const name = this.leagueID; // Assuming this.data contains the necessary data for the API call
    this.commonservice.creatRound(compnyclubnameStr,bodyData).subscribe({
      next: (res: any) => {
        // Handle success response
        console.log(res);
        // Navigate to the completed leagues page
        this.router.navigate(['players-league/completed-leagues']);
        // Close the dialog
        this.close();
      },
      error: (err: any) => {
        // Handle error response
        console.error(err);
        // Optionally, you might want to provide feedback to the user about the error
      }
    });
  }
close (){
  this.dialogeref.close();
}
}
