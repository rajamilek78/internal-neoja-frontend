import { Component, Inject, Input, OnInit, inject, input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { CommonService, SharedService } from '@app/core';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-lock-data-dialogue',
  templateUrl: './lock-data-dialogue.component.html',
  styleUrl: './lock-data-dialogue.component.scss',
})
export class LockDataDialogueComponent implements OnInit {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  responseData: any;
  commonService: any;
  leagueID!: string | null;
  roundCount!: number;

  constructor(
    private router: Router,
    private dialogeref: MatDialogRef<LockDataDialogueComponent>,
    private sharedService: SharedService,
    private snackbarService : SnackBarService,
    private commonservice: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    console.log(this.data.leagueID);
    this.userSubscriber();
    // this.leagueID = localStorage.getItem('leagueID');
    if (this.data) {
      this.roundCount = this.data.roundCount;
      this.leagueID = this.data.leagueID;
    }
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        console.log(this.userDetail);
      });
  };

  lockRound() {
    const bodyData = this.data.responseData.round;
    console.log(bodyData);

    console.log(this.data.responseData.round);
    //const ownedCompanies = this.userDetail?.owned_companies;
    const ownedClubs = this.userDetail?.owned_clubs;
    const compnyclubnameStr = `${ownedClubs}/${this.leagueID}`;
    this.commonservice.creatRound(compnyclubnameStr, bodyData).subscribe({
      next: (res: any) => {
        // Handle success response
        console.log(res);
        // Navigate to the completed leagues page
        this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
        // Close the dialog
        this.close();
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
        // Handle error response
        console.error(err);
        // Optionally, you might want to provide feedback to the user about the error
      },
    });
  }
  close() {
    this.dialogeref.close();
  }
}
