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
  formattedStartDate!:string | null;
  formattedEndDate!:string | null;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private datePipe : DatePipe,
    private dialog: MatDialogRef<CreateLeagueDialogComponent>,
    fb: FormBuilder,
    private leagueService: LeagueService
  ) {
    super(fb);
  }
  ngOnInit(): void {
    this.initLeagueForm();
    if (this.data.league) {
      this.data.league.start_date = new Date(this.data.league.start_date);
      this.data.league.end_date = new Date(this.data.league.end_date)
      this.leagueCRUD_Form.patchValue(this.data.league);
    }
  }
  initLeagueForm() {
    this.leagueCRUD_Form = this.createForm({
      name: ['', [Validators.maxLength(60)]],
      description: ['',[Validators.maxLength(500)]],
      start_date: [''],
      // owner : ['aminraiyani@gmail.com'],
      // delegate : ['aminraiyani@gmail.com'],
      end_date: [''],
      dupr_recorded: [false],
      type: [''],
      doubles: [true],
      rounds_per_day: [0],
    });
  }
  onClickAddLeague() {
     this.formattedStartDate = this.datePipe.transform(this.leagueCRUD_Form.value.start_date,'MM/dd/yyyy');
    this.formattedEndDate = this.datePipe.transform(this.leagueCRUD_Form.value.end_date,'MM/dd/yyyy');
    this.leagueCRUD_Form.patchValue({
      start_date: this.formattedStartDate,
      end_date: this.formattedEndDate
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
    this.leagueCRUD_Form.patchValue({
      start_date: this.formattedStartDate,
      end_date: this.formattedEndDate
    });
    const urlString = `${this.data.clubID}/${this.leagueCRUD_Form.value.name}`;
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
    if (this.data.league) {
      this.updateLeague();
    } else {
      this.onClickAddLeague();
    }
  }
  

  close() {
    this.dialog.close();
  }
  // formatDate(date: string | Date): string {
  //   if (!date) return '';

  //   // Assuming input is in ISO string format, you may need to adjust this based on your date format
  //   const d = new Date(date);
  //   const month = '' + (d.getMonth() + 1);
  //   const day = '' + d.getDate();
  //   const year = d.getFullYear();

  //   return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('/');
  // }

  get formControls() {
    return this.leagueCRUD_Form.controls;
  }
}
