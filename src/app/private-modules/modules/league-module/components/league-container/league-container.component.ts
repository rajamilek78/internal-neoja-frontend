import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SharedCommonService } from '../../../../../core/services/shared-common.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LockDataDialogueComponent } from '../lock-data-dialogue/lock-data-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LeagueModuleService } from '../../services/league-module.service';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { SharedUserService } from '@app/core';
import { RouteConstant } from '@app/helpers/constants';
import { PrintRoundFormatOneComponent } from '../print-round-format-one/print-round-format-one.component';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent
  implements OnInit, OnDestroy
{
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  groups: any;
  responseData: any;
  rawData: any;
  selectedFormat = '2';
  selectedGroup!: any;
  isEdit: boolean = false;
  selectedClubID!: string;
  leagueName!: string;
  leagueID!: string;
  roundID: string = '';
  groupsArrayToBeUpdated: any[] = [];
  isInvisilePdf = false;
  roundCount!: number;
  isTouched: boolean = false;
  labelName: string = '';

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
  ngOnInit(): void {
    console.log("calling")
    this.userSubscriber();
    this.route.params.subscribe((params) => {
      this.isEdit = params['isEdit'];
      this.roundID = params['roundID'];
      this.leagueID = params['leagueID'];
      this.leagueName = params['leagueName'];
      this.selectedClubID = params['clubId'];
      this.labelName = params['labelName'];
    });
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
        if (this.userDetail) {
          // this.selectedClubID = this.userDetail.club_id;
        }
      });
  };

  openDialogue(): void {
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: '450px',
      data: {
        leagueID: this.leagueID,
        responseData: this.responseData,
        roundCount: this.roundCount,
      },
    });
    dialogueRef.afterClosed().subscribe((result) => {
    });
  }
  // To get Match Data
  getMatchData() {
    this.SharedCommonService.getMatchData().subscribe((data) => {
      this.rawData = data;
      this.roundCount = this.rawData.round.header.round;
      this.responseData = data;
      if (this.responseData) {
        this.groups = Object.keys(this.responseData.round.groups).map(
          (key) => ({
            name: key,
            data: this.responseData.round.groups[key],
          })
        );
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
        if (this.responseData) {
          this.groups = Object.keys(this.responseData).map((key) => ({
            name: key,
            data: this.responseData[key],
          }));
        } else {
          console.log('No data found in responseData.');
        }
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
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
    setTimeout(() => {
      this.leagueService.updateScore(urlString, body).subscribe({
        next: (res: any) => {
          this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
        },
      });
    }, 100);
  }

  onBlurTeamScore = (event) => {
    const { groups } = event;
    this.isTouched = event.isTouched;
    this.groupsArrayToBeUpdated = [...groups];
  };
  handleTabChange(event) {
    this.selectedGroup = `Group ${event}`;
  }
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
    this.selectedGroup = this.groups[event.index];
  }
  onClickDownloadAll() {
    const data = {
      rawData: this.rawData,
      groups: this.groups,
      roundCount: this.roundID,
      clubID: this.selectedClubID,
    };
    this.leagueService.setRoundData(data);
    window.open(`${RouteConstant.PRINT_CONTAINER}`, '_blank');
  }

  onClickDownload() {
    // const data = document.getElementById('playerData'); // Replace with the id of your table
    // if (data) {
    //   html2canvas(data, { scale: 2 }).then((canvas) => {
    //     // Few necessary setting options
    //     const imgWidth = 208;
    //     const pageHeight = 295;
    //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //     const heightLeft = imgHeight;
    //     const contentDataURL = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //     const position = 0;
    //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //     const filename = `Round ${this.roundCount}_${this.selectedGroup}.pdf`;
    //     pdf.save(filename); // Generated PDF
    //   });
    // }
    if (this.rawData && this.rawData.round_pdf_public_url && this.rawData.round_pdf_public_url.format1) {
      window.open(this.rawData.round_pdf_public_url.format1, '_blank');
    } else {
      console.log('Round PDF URL not found or format1 is empty.');
    }
  }
}
