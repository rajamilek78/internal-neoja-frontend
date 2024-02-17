import { Component } from '@angular/core';
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

@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent {
  constructor(
    private SharedCommonService: SharedCommonService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route : ActivatedRoute,
    private router : Router
  ) {}
  openDialogue(): void {
    const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
      width: '450px',
    });
    dialogueRef.afterClosed().subscribe((result) => {
      console.log('the dialogue is closed now');
    });
  }
  groups: any;
  responseData: any;
  selectedFormat = '1';
  selectedGroup!: any;
  edite: boolean = false;

  // ngOnInit(): void {
  //   this.SharedCommonService.getMatchData().subscribe( data => {
  //     this.responseData = data;
  //     console.log(this.responseData);

  //     this.groups = Object.keys(this.responseData.fixtures).map(key => ({
  //       name: key,
  //       data: this.responseData.fixtures[key]
  //     }));
  //     console.log(this.groups);
  //   })
  //   // let matchData = localStorage.getItem('matchData');
  //   // if (matchData) {
  //     // this.responseData = JSON.parse(matchData);
  //     // console.log("this is parsed data :",this.responseData);

  //   // } else {
  //   //   console.log('No match data found in local storage.');
  //   // }
  // }
  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.edite = params['edite'];
    });
    console.log(this.edite);
    
    this.SharedCommonService.getMatchData().subscribe((data) => {
      this.responseData = data;

      if (this.responseData) {
        this.groups = Object.keys(this.responseData.fixtures).map((key) => ({
          name: key,
          data: this.responseData.fixtures[key],
        }));
        console.log(this.groups);
      } else {
        console.log('No fixtures found in responseData.');
      }
    });
  }

  saveRound(){
    this.router.navigate(['players-league/completed-leagues'])
  }

  onSelectionChange() {
    this.cdr.detectChanges();
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Tab changed, new index: ' + event.index);
    this.selectedGroup = this.groups[event.index];
    console.log(group);
  }

  downloadTableAsPDF() {
    debugger;
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
        pdf.save('TableData.pdf'); // Generated PDF
      });
    } else {
      console.error('Element not found');
    }
  }
  // downloadTableAsPDF() {
  //   const doc = new jsPDF();

  //   // Replace this with your actual data.
  //   // const data = this.groups.find(group => group).data;

  //   const data = this.selectedGroup.data;
  //   console.log("this is selected data",data);

  //   // You'll need to format your data into an array of arrays, with each inner array representing a row of data.
  //   const body = data.map(row => Object.values(row));

  //   // You'll also need an array of column names for the headers.
  //   const headers = Object.keys(data[0]);
  //   console.log("this is table  : ",data);

  //   (doc as any).autoTable({
  //     head: [headers],
  //     body: body
  //   });

  //   doc.save('TableData.pdf');
  // }
}
