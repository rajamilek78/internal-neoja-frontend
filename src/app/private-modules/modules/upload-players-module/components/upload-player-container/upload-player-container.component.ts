import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonService, SharedService } from '@app/core';
import { UserModel } from '@app/helpers/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-player-container',
  templateUrl: './upload-player-container.component.html',
  styleUrl: './upload-player-container.component.scss',
})
export class UploadPlayerContainerComponent implements OnInit {
  playerCount = 5;
  selectedFormat = '1';
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userSubscriber();
    this.getAllLeagues();
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
  getAllLeagues() {
    const ownedCompanies = this.userDetail?.owned_companies;
    const ownedClubs = this.userDetail?.owned_clubs;
    const compnyclubStr = `${ownedCompanies}/${ownedClubs}/all`;
    console.log(compnyclubStr);
    this.commonService.getAllLeagues(compnyclubStr).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map((key) => ({
          name: key,
          description: res[key].description,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  onRadioButtonChange() {
    this.cdr.detectChanges();
  }
}
