import { Component , OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateLeagueDialogComponent } from '../create-league-dialog/create-league-dialog.component';
import { CommonService, SharedUserService} from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrl: './create-league.component.scss',
})
export class CreateLeagueComponent implements OnInit{
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  leagues! : any[];
  constructor(
    private dialog: MatDialog,
    private commonService : CommonService,
    private sharedUserService : SharedUserService
    ) {}
  ngOnInit(): void {
    this.userSubscriber();
    this.getAllLeagues();
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService.getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
      });
  };


  getAllLeagues(){
    const companyID = this.userDetail?.owned_companies;
    const clubID = this.userDetail?.owned_clubs;
    const companyIDclubIDStr = `${companyID}/${clubID}/all`
    this.commonService.getAllLeagues(`${companyIDclubIDStr}`).subscribe({
      next : (res : any)=>{
        console.log(res);
        },
      error : (err : any)=>{
        console.log(err);
      }
    });
  }

  openDialogue(): void {
    const dialogueRef = this.dialog.open(CreateLeagueDialogComponent, {
      width: '450px',
    });
    dialogueRef.afterClosed().subscribe((result) => {
      console.log('the dialogue is closed now');
    });
  }
}
