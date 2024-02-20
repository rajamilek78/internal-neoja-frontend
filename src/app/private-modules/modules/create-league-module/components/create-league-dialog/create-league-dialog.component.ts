import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';
import { LeagueService } from '../../services/league.service';
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
      name: ['',[Validators.required]],
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
  

}
