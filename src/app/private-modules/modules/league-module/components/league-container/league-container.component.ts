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
import { LeagueModuleService } from '../../services/league-module.service';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { SharedUserService } from '@app/core';

@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent {
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  groups: any;
  responseData: any;
  selectedFormat = '1';
  selectedGroup!: any;
  edite: boolean = false;
  selectedCompanyID!: string;
  selectedClubID!: string;
  leagueID!: string;
  roundID:string ="";
  constructor(
    private SharedCommonService: SharedCommonService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route : ActivatedRoute,
    private router : Router,
    private leagueService : LeagueModuleService,
    private sharedUserService : SharedUserService
    ) {}
    
    ngOnInit(): void {
      this.userSubscriber();
      this.route.params.subscribe( params =>{
        this.edite = params['edite'];
        this.roundID = params['roundID'];
        this.leagueID = params['leagueID'];
        
      });
      console.log(this.edite);
      if(this.edite){
        this.getRoundById();
      }
      else{
        this.getMatchData();
      }
      // this.getMatchData();
      // this.getRoundById();
    }
    openDialogue(): void {
      console.log(this.leagueID)
      const dialogueRef = this.dialog.open(LockDataDialogueComponent, {
        width: '450px',
        data: {
          leagueID: this.leagueID,
          responseData: this.responseData,
          
        }
       
      });
      dialogueRef.afterClosed().subscribe((result) => {
        console.log('the dialogue is closed now');
      });
    }
// To get Match Data 
  getMatchData(){
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
  getRoundById(){
    const urlString = `${this.selectedCompanyID}/${this.selectedClubID}/${this.leagueID}/${this.roundID}`
    this.leagueService.getRoundByID(urlString).subscribe({
      next : (res : any)=>{
        debugger;
        this.responseData = res.groups;
        debugger;
        console.log(this.responseData);
        
        // this.responseData = res;
        if (this.responseData) {
          this.groups = Object.keys(this.responseData).map((key) => ({
            name: key,
            data: this.responseData[key],
          }));
          console.log(this.groups);
        } else {
          console.log('No data found in responseData.');
        }
      },
      error : (err: any)=>{
        console.log(err);
      }
    });
  }
  
  // getRoundById(){
  //   const urlString = `${this.selectedCompanyID}/${this.selectedClubID}/${this.leagueID}/${this.roundID}`
  //   this.leagueService.getRoundByID(urlString).subscribe({
  //     next : (res : any)=>{
  //       // this.responseData = res;
  //       console.log(res);
        
  //     },
  //     error : (err: any)=>{
  //       console.log(err);
        
  //     }
  //   });
  // }
  // Subcribe loggedIn user's Details
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedUserService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedUserService.getUser();
        console.log(this.userDetail);
        if (this.userDetail) {
          const companyIDs = this.userDetail.owned_companies;
          const clubIDs = this.userDetail.owned_clubs;
          this.selectedClubID = clubIDs[0];
          this.selectedCompanyID = companyIDs[0];
        }
      });
  };

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

    

  //   const data = this.selectedGroup.data;
  //   console.log("this is selected data",data);

  //   const body = data.map(row => Object.values(row));

  //   const headers = Object.keys(data[0]);
  //   console.log("this is table  : ",data);

  //   (doc as any).autoTable({
  //     head: [headers],
  //     body: body
  //   });

  //   doc.save('TableData.pdf');
  // }
}
