import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';
import { LeagueService } from '../../services/league.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { SharedService } from '@app/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';

@Component({
  selector: 'app-create-league-dialog',
  templateUrl: './create-league-dialog.component.html',
  styleUrl: './create-league-dialog.component.scss',
})
export class CreateLeagueDialogComponent
  extends FormBaseComponent
  implements OnInit
{
  leagueCRUD_Form!: FormGroup;
  formattedStartDate!: string | null;
  formattedEndDate!: string | null;
  leagueID!: string;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  clubID!: string;
  sessionID!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private datePipe: DatePipe,
    private dialog: MatDialogRef<CreateLeagueDialogComponent>,
    fb: FormBuilder,
    private leagueService: LeagueService,
    private snackbarService: SnackBarService,
    private sharedService: SharedService,

  ) {
    super(fb);
  }
  ngOnInit(): void {
    this.initLeagueForm();
    this.userSubscriber();
    if (this.data.leagueID) {
      // this.leagueID = this.data.leagueID.toUpperCase();
      this.leagueID = this.data.leagueID;
      this.clubID = this.data.clubID;
      this.getLeagueByID();
    } else {
      this.clubID = this.data.clubID;
    }
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  initLeagueForm() {
    this.leagueCRUD_Form = this.createForm({
      name: ['', [Validators.maxLength(60)]],
      description: ['', [Validators.maxLength(500)]],
      start_date: [new Date()],
      end_date: [new Date()],
      dupr_recorded: [false],
      type: [''],
      doubles: [true],
      active: [true],
      rounds_per_day: ['1'],
    });
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          //this.clubID = this.userDetail?.club_id;
          this.sessionID = this.userDetail?.session_id
        }
      });
  };

  getLeagueByID() {
    const urlString = `${this.clubID}/${this.leagueID}`;
    this.leagueService.getLeagueById(urlString).subscribe({
      next: (res) => {
        this.leagueCRUD_Form.patchValue({
          name: res.header.name,
          description: res.header.description,
          start_date: new Date(res.header.start_date),
          end_date: new Date(res.header.end_date),
          dupr_recorded: res.header.dupr_recorded,
          type: res.header.type,
          doubles: res.header.doubles,
          active: res.header.active,
          rounds_per_day: String(res.header.rounds_per_day),
        });
      },
      error: (err) => {
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }
  onClickAddLeague() {
    const formattedStartDate = this.datePipe.transform(
      this.leagueCRUD_Form.value.start_date,
      'MM/dd/yyyy'
    );
    const formattedEndDate = this.datePipe.transform(
      this.leagueCRUD_Form.value.end_date,
      'MM/dd/yyyy'
    );
    this.leagueCRUD_Form.patchValue({
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });
    if (this.data.league) {
      this.updateLeague();
    } else {
      const urlString = `${this.data.clubID}`;
      const bodyData = this.leagueCRUD_Form.value
      const body = {
        ...bodyData,
        sessionId : this.sessionID
      }
      this.leagueService
        .createLeague(urlString, body)
        .subscribe({
          next: (res: any) => {
            this.leagueService.leagueChanged.emit();
            this.close();
          },
          error: (err: any) => {
            const message = err.error.message;
            this.snackbarService.setSnackBarMessage(message);
          },
        });
    }
  }
  //To update existing league
  updateLeague() {
    const formattedStartDate = this.datePipe.transform(
      this.leagueCRUD_Form.value.start_date,
      'MM/dd/yyyy'
    );
    const formattedEndDate = this.datePipe.transform(
      this.leagueCRUD_Form.value.end_date,
      'MM/dd/yyyy'
    );
    this.leagueCRUD_Form.patchValue({
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });
    const urlString = `${this.data.clubID}/${this.leagueID}`;
    const bodyData = this.leagueCRUD_Form.value
    const body = {
      ...bodyData,
      sessionId : this.sessionID
    }
    this.leagueService
      .updateLeague(urlString, body)
      .subscribe({
        next: (res: any) => {
          this.leagueService.leagueChanged.emit();
          this.close();
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
        },
      });
  }
  onFormSubmit() {
    if (this.leagueID) {
      this.updateLeague();
    } else {
      this.onClickAddLeague();
    }
  }

  close() {
    this.dialog.close();
  }
  get formControls() {
    return this.leagueCRUD_Form.controls;
  }
}
