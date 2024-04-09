import { Component, Inject, OnInit } from '@angular/core';
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
  clubID!: string;
  sessionID!: string;

  constructor(
    private router: Router,
    private dialogeref: MatDialogRef<LockDataDialogueComponent>,
    private sharedService: SharedService,
    private snackbarService: SnackBarService,
    private commonservice: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.userSubscriber();
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
        if (this.userDetail) {
          this.clubID = this.userDetail.club_id;
          this.sessionID = this.userDetail?.session_id
        }
      });
  };

  lockRound() {
    const bodyData = this.data.responseData.round;
    const body = {
      ...bodyData,
      sessionID: this.sessionID
    }
    // const clubID = this.userDetail?.club_id;
    const compnyclubnameStr = `${this.clubID}/${this.leagueID}`;
    this.commonservice.creatRound(compnyclubnameStr, body).subscribe({
      next: (res: any) => {
        // Navigate to the completed leagues page
        this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
        // Close the dialog
        this.close();
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  close() {
    this.dialogeref.close();
  }
}
