import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { SharedCommonService } from "../../../../../core/services/shared-common.service";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { LockDataDialogueComponent } from "../lock-data-dialogue/lock-data-dialogue.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { LeagueModuleService } from "../../services/league-module.service";
import { Subscription } from "rxjs";
import { UserModel } from "@app/helpers/models";
import { LeaguemanageService, SharedUserService } from "@app/core";
import { RouteConstant } from "@app/helpers/constants";
import { PrintRoundFormatOneComponent } from "../print-round-format-one/print-round-format-one.component";
import { SnackBarService } from "@app/core/services/snackbar.service";

@Component({
  selector: "app-league-container",
  templateUrl: "./league-container.component.html",
  styleUrl: "./league-container.component.scss",
})
export class LeagueContainerComponent implements OnInit, OnDestroy {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  groups: any;
  responseData: any;
  rawData: any;
  selectedFormat = "1";
  selectedGroup!: any;
  isEdit: boolean = false;
  selectedClubID!: string;
  leagueName!: string;
  leagueID!: string;
  roundID: string = "";
  groupsArrayToBeUpdated: any[] = [];
  isInvisilePdf = false;
  roundCount!: number;
  isTouched: boolean = false;
  labelName: string = "";
  roundDate: any;
  session_id!: string;
  leagueType!: string;

  constructor(
    private SharedCommonService: SharedCommonService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackBarService,
    private leagueService: LeagueModuleService,
    private leagueMangeService: LeaguemanageService,
    private sharedUserService: SharedUserService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userSubscriber();
     // Subscribe to route params changes
    this.route.params.subscribe((params) => {
      this.isEdit = params["isEdit"];
      this.roundID = params["roundID"];
      this.leagueID = params["leagueID"];
      this.leagueName = params["leagueName"];
      this.selectedClubID = params["clubId"];
      this.labelName = params["labelName"];
    });
    if (this.isEdit) {
      this.getRoundById();
    } else {
      this.getMatchData();
    }

    // Subscribe to selected league changes
    this.leagueMangeService.getSelectedLeague().subscribe((league: any) => {
      if (league) {
        this.leagueType = league.type;
      }
    });
  }

   // Unsubscribe from subscriptions
  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
  userSubscriber = () => {
     // Subscribe to user detail changes
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        if (this.userDetail) {
          this.session_id = this.userDetail?.session_id;
          // this.selectedClubID = this.userDetail.club_id;
        }
      });
  };

  openDialogue(): void {
    // Open lock data dialogue
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: "450px",
      data: {
        leagueID: this.leagueID,
        responseData: this.responseData,
        roundCount: this.roundCount,
      },
    });
    dialogueRef.afterClosed().subscribe((result) => {});
  }
  // To get Match Data
  getMatchData() {
     // Fetch match data
    this.SharedCommonService.getMatchData().subscribe((data) => {
      this.rawData = data;
      this.roundCount = this.rawData.round.header.round;
      this.roundDate = this.rawData.round.header.date;
      this.responseData = data;
      if (this.responseData) {
        this.groups = Object.keys(this.responseData.round.groups).map(
          (key) => ({
            name: key,
            data: this.responseData.round.groups[key],
          })
        );
      } else {
        console.log("No fixtures found in responseData.");
      }
    });
  }

  getRoundById() {
     // Get round data by ID
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
          console.log("No data found in responseData.");
        }
      },
      error: (err: any) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  onSaveClick() {
     // Save changes
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
      session_id: this.rawData.session_id,
      groups: groups,
      players: this.rawData.players,
      round_pdf_urls: this.rawData.round_pdf_urls,
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
    // Handle team score changes
    const { groups } = event;
    this.isTouched = event.isTouched;
    this.groupsArrayToBeUpdated = [...groups];
  };
   // Handle tab change event
  handleTabChange(event) {
    this.selectedGroup = `Group ${event}`;
  }
  saveRound() {
     // Save round data
    this.router.navigate(["players-league/completed-leagues"]);
  }
  onCancel() {
    // Cancel action
    this.router.navigate([RouteConstant.COMPLETED_LEAGUES]);
  }
  onSelectionChange() {
     // Detect changes
    this.cdr.detectChanges();
  }
  onTabChange(event: MatTabChangeEvent) {
     // Handle tab change event
    this.selectedGroup = this.groups[event.index];
  }
  onClickDownloadAll() {
     // Download all data
    const data = {
      rawData: this.rawData,
      groups: this.groups,
      roundCount: this.roundID,
      clubID: this.selectedClubID,
    };
    this.leagueService.setRoundData(data);
    window.open(`${RouteConstant.PRINT_CONTAINER}`, "_blank");
  }

  onClickDownload() {
     // Download PDF
    if (
      this.rawData &&
      this.rawData.round.round_pdf_urls &&
      this.rawData.round.round_pdf_urls.fixture_format1
    ) {
      window.open(this.rawData.round.round_pdf_urls.fixture_format1, "_blank");
    } else {
      console.log("Round PDF URL not found or format1 is empty.");
    }
  }
}
