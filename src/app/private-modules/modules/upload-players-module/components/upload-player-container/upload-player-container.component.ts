import { Component, Input, OnInit } from '@angular/core';
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
  @Input() roundsLength!: number;
  selectedFormat = '1';
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues: any[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log(this.roundsLength)
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
    console.log(compnyclubStr)
 this.commonService.getAllLeagues(compnyclubStr).subscribe({
            next: (res: any) => {
              this.leagues = Object.keys(res).map(key => ({
                name: key,
                description: res[key].description
              }));
            },
            error: (err: any) => {
            }
        });
    }
  
    onLeagueSelect(leagueName: string) {
      const ownedCompanies=  this.userDetail?.owned_companies
    const ownedClubs = this.userDetail?.owned_clubs;
    const name = 'FRIENDS-3.0-4.0-SAT12PM-WINTER1';

    const compnyclubnameStr = `${ownedCompanies}/${ownedClubs}/${name}/all`;
      this.commonService.getRounds(compnyclubnameStr).subscribe({
        next: (res: any) => {
          console.log(res);
          this.roundsLength = Object.keys(res).length;
          
          if(this.roundsLength > 1){
            this.selectedFormat = '2';
          }

          console.log(this.roundsLength) // Handle the league summary response here
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }


  
  onRadioButtonChange() {
    this.cdr.detectChanges();
  }
}
