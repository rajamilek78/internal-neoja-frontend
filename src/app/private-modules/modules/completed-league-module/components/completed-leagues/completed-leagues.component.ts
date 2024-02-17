import { Component, OnInit } from '@angular/core';
import { CommonService, SharedService } from '../../../../../core';
import { CompanyModel } from '@app/helpers/models/company.model';
import { MatDialog } from '@angular/material/dialog';
import { LockDataDialogueComponent } from '../../../league-module/components/lock-data-dialogue/lock-data-dialogue.component';
import { Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
@Component({
  selector: 'app-completed-leagues',
  templateUrl: './completed-leagues.component.html',
  styleUrl: './completed-leagues.component.scss',
})
export class CompletedLeaguesComponent implements OnInit {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues : any[] = [];
  selectedLeague! : string;
  companies: { [key: string]: { name: string; description: string } } = {};
  newCompanies!: CompanyModel[];
  clubs: { [key: string]: { name: string; phone: string; address: any } } = {};
  // clubs : any;
  constructor(
    private commonService: CommonService,
    private dialog: MatDialog,
    private router : Router,
    private sharedUserService : SharedService
  ) {}

  openDialogue(): void {
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: '450px',
    });
    dialogueRef.afterClosed().subscribe((result) => {
      console.log('the dialogue is closed now');
    });
  }

  ngOnInit(): void {
    // this.getAllCompanies();
    this.userSubscriber();
    this.getAllLeagues();
  }

  viewScore(){
    this.router.navigate([RouteConstant.VIEW_SCORES_ROUTE]);
  }

  edit(){
    // this.router.navigate([RouteConstant.LEAGUE_CONTAINER]);
    this.router.navigate(['players-league' ,{ edite: true }]);
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
      });
  };
  getAllLeagues() {
    const companyID = this.userDetail?.owned_companies;
    const clubID = this.userDetail?.owned_clubs;
    const companyIDclubIDStr = `${companyID}/${clubID}/all`
    this.commonService.getAllLeagues(`${companyIDclubIDStr}`).subscribe({
      next: (res: any) => {
        this.leagues = Object.keys(res).map(key => ({id: key, name: res[key].name}));
        this.selectedLeague = this.leagues[0].id;
        console.log(this.leagues);
        },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  getAllCompanies() {
    this.commonService.getAllCompanies().subscribe({
      next: (resp: any) => {
        // format change
        // [{
        //   id:'DLF',
        //   name:'test',
        //   description:'test',
        // }]
        this.companies = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getAllClubs(companyID: string) {
    this.commonService.getAllClubs(`${companyID}/all`).subscribe({
      next: (resp: any) => {
        this.clubs = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
