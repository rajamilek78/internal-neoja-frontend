import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SharedCommonService } from '../../../../../core/services/shared-common.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { group } from '@angular/animations';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LockDataDialogueComponent } from '../lock-data-dialogue/lock-data-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LeagueModuleService } from '../../services/league-module.service';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { SharedUserService } from '@app/core';
import { RouteConstant } from '@app/helpers/constants';
import { PrintRoundComponent } from '../print-round/print-round.component';
import { PrintRoundFormatOneComponent } from '../print-round-format-one/print-round-format-one.component';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild(PrintRoundFormatOneComponent)
  printComponent!: PrintRoundFormatOneComponent;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  groups: any;
  responseData: any;
  rawData: any;
  selectedFormat = '2';
  selectedGroup!: any;
  isEdit: boolean = false;
  //selectedCompanyID!: string;
  selectedClubID!: string;
  leagueName!: string;
  leagueID!: string;
  roundID: string = '';
  groupsArrayToBeUpdated: any[] = [];
  isInvisilePdf = false;
  roundCount!: number;
  isTouched: boolean = false;
  
  
  constructor(
    private SharedCommonService: SharedCommonService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackBarService,
    private leagueService: LeagueModuleService,
    private sharedUserService: SharedUserService
  ) {}
  ngAfterViewInit() {
    // if (!this.isEdit && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
    //   this.router.navigate(['upload-players']);
    // }
  }
  ngOnInit(): void {
    this.userSubscriber();
    this.route.params.subscribe((params) => {
      this.isEdit = params['isEdit'];
      this.roundID = params['roundID'];
      this.leagueID = params['leagueID'];
      this.leagueName = params['leagueName'];
      this.selectedClubID = params['clubId'];
      // this.selectedLeague = params['selectedLeague'];
    });
    console.log(this.isEdit);
    if (this.isEdit) {
      this.getRoundById();
    } else {
      this.getMatchData();
    }
  }
  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
        if (this.userDetail) {
          //const companyIDs = this.userDetail.owned_companies;
          // this.selectedClubID = this.userDetail.club_id;
        }
      });
  };

  openDialogue(): void {
    console.log(this.leagueID);
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: '450px',
      data: {
        leagueID: this.leagueID,
        responseData: this.responseData,
        roundCount: this.roundCount,
      },
    });
    dialogueRef.afterClosed().subscribe((result) => {
      console.log('the dialogue is closed now');
    });
  }
  // To get Match Data
  getMatchData() {
    this.SharedCommonService.getMatchData().subscribe((data) => {
      this.rawData = data;
      this.roundCount = this.rawData.round.header.round;
      console.log(this.roundCount);
      this.responseData = data;
      console.log(this.rawData);
      if (this.responseData) {
        this.groups = Object.keys(this.responseData.round.groups).map(
          (key) => ({
            name: key,
            data: this.responseData.round.groups[key],
          })
        );
        console.log(this.groups);
      } else {
        console.log('No fixtures found in responseData.');
      }
    });
  }

  getRoundById() {
    const urlString = `${this.selectedClubID}/${this.leagueID}/${this.roundID}`;
    this.leagueService.getRoundByID(urlString).subscribe({
      next: (res: any) => {
        this.rawData = res;
        this.roundCount = this.rawData.header?.round;
        this.responseData = res ? res.groups || res : [];
        console.log(this.rawData);
        console.log(this.responseData);
        if (this.responseData) {
          this.groups = Object.keys(this.responseData).map((key) => ({
            name: key,
            data: this.responseData[key],
          }));
          console.log('this is groups', this.groups);
        } else {
          console.log('No data found in responseData.');
        }
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
        console.log(err);
      },
    });
  }

  onSaveClick() {
    this.groupsArrayToBeUpdated = this.groupsArrayToBeUpdated.map((e) => {
      const obj: any = { [e.name]: e.data };
      return obj;
    });
    const groups = Object.assign({}, ...this.groupsArrayToBeUpdated);
    const urlString = `${this.selectedClubID}/${this.leagueID}/${this.roundID}`;
    const body = {
      header: {
        day: this.rawData.header.day,
        date: this.rawData.header.date,
        round: this.rawData.header.round,
        score_locked: false,
      },

      groups: groups,
      players: this.rawData.players,
    };
    console.log(body);
    setTimeout(() => {
      this.leagueService.updateScore(urlString, body).subscribe({
        next: (res: any) => {
          this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
          console.log(err);
        },
      });
    }, 100);
  }

  onBlurTeamScore = (event) => {
    const { groups } = event;
    this.isTouched = event.isTouched;
    this.groupsArrayToBeUpdated = [...groups];
  };
  handleTabChange(event){
    this.selectedGroup = `Group ${event}`;
    console.log(this.selectedGroup);
}

  // Subcribe loggedIn user's Details
 

  saveRound() {
    this.router.navigate(['players-league/completed-leagues']);
  }
  onCancel() {
    this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
  }

  onSelectionChange() {
    this.cdr.detectChanges();
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Tab changed, new index: ' + event.index);
    this.selectedGroup = this.groups[event.index];
    console.log(group);
  }
  onClickDownloadAll() {
    const data = {
      rawData: this.rawData,
      groups: this.groups,
      roundCount: this.roundID,
      clubID: this.selectedClubID,
    };
    this.leagueService.setRoundData(data);
    // this.router.navigate(['fixtures/print-container']);
    window.open(`${RouteConstant.PRINT_CONTAINER}`, '_blank');
  }

  onClickDownload() {
    // this.isInvisilePdf = true;
    // const a = document.getElementById("overflowHidden");
    // if(a){
    //   a.style.overflow = 'hidden';
    // }
    // setTimeout(()=>{
    //   this.printComponent.downloadTableAsPDF();
    // }, 10);
    const data = document.getElementById('playerData'); // Replace with the id of your table
    if (data) {
      html2canvas(data, { scale: 2 }).then((canvas) => {
        // Few necessary setting options
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        const filename = `Round ${this.roundCount}_${this.selectedGroup}.pdf`;
        pdf.save(filename); // Generated PDF
      });
    } else {
      console.error('Element not found');
    }
    // this.router.navigate(['players-league/print']);
  }
}
