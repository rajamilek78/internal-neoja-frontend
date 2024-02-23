import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';
import { LeagueService } from '../../services/league.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-league-dialog',
  templateUrl: './create-league-dialog.component.html',
  styleUrl: './create-league-dialog.component.scss'
})
export class CreateLeagueDialogComponent extends FormBaseComponent implements OnInit {
  leagueCRUD_Form!: FormGroup;
  constructor (
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dialog : MatDialogRef<CreateLeagueDialogComponent>,
    fb : FormBuilder,
    private leagueService : LeagueService
    ){
    super(fb)
  }
  ngOnInit(): void {
    this.initLeagueForm();
    if (this.data.league) {
      this.leagueCRUD_Form.patchValue(this.data.league);
    }
  }
  initLeagueForm(){
    this.leagueCRUD_Form = this.createForm({
      name: [''],
      description: ['',],
      start_date: [''],
      end_date: [''],
      dupr_recorded: [false],
      type: [''],
      doubles: [true],
      rounds_per_day: [0]
    })
  }
  createUpdateLeague(){
    const formattedStartDate = this.formatDate(this.leagueCRUD_Form.value.start_date);
    const formattedEndDate = this.formatDate(this.leagueCRUD_Form.value.end_date);
    
    // Updating the form values with formatted dates
    this.leagueCRUD_Form.patchValue({
      start_date: formattedStartDate,
      end_date: formattedEndDate
    });
    this.leagueService.createLeague(
      `${this.data.companyIDclubID}/${this.leagueCRUD_Form.value.name}`,
      this.leagueCRUD_Form.value).subscribe({
        next : (res : any)=>{
          console.log(res);
          this.close();
          },
        error : (err : any)=>{
          console.log(err);
          }
      });
  }
  close(){
    this.dialog.close()
  }
  formatDate(date: string | Date): string {
    if (!date) return '';
    
    // Assuming input is in ISO string format, you may need to adjust this based on your date format
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('/');
  }
  
  

}
