import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';
import { LeagueService } from '../../services/league.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  clubID!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private datePipe: DatePipe,
    private dialog: MatDialogRef<CreateLeagueDialogComponent>,
    fb: FormBuilder,
    private leagueService: LeagueService
  ) {
    super(fb);
  }
  ngOnInit(): void {
    this.initLeagueForm();
    if (this.data.leagueID) {
      // this.leagueID = this.data.leagueID.toUpperCase();
      this.leagueID = this.data.leagueID;
      this.clubID = this.data.clubID;
      this.getLeagueByID();
    }else{
      this.clubID = this.data.clubID;
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
      rounds_per_day: [0],
    });
  }

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
          rounds_per_day: String(res.header.rounds_per_day),
        });
        console.log('this is league', res);
      },
      error: (err) => {
        console.log(err);
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
      this.leagueService
        .createLeague(urlString, this.leagueCRUD_Form.value)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.close();
          },
          error: (err: any) => {
            console.log(err);
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
    const urlString = `${
      this.data.clubID
    }/${this.leagueID}`;
    this.leagueService
      .updateLeague(urlString, this.leagueCRUD_Form.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.close();
        },
        error: (err: any) => {
          console.log(err);
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
