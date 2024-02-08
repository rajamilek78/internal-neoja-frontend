import { Component } from '@angular/core';
import { SharedService } from '../../../../../helpers/services/shared.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-league-container',
  templateUrl: './league-container.component.html',
  styleUrl: './league-container.component.scss',
})
export class LeagueContainerComponent {
  constructor(private sharedService : SharedService){}
  groups: any;
  responseData : any;
  selectedFormat ='1';

  ngOnInit(): void {
    let matchData = localStorage.getItem('matchData');
    if (matchData) {
      this.responseData = JSON.parse(matchData);
      // console.log("this is parsed data :",this.responseData);
      
      this.groups = Object.keys(this.responseData.fixtures).map(key => ({
        name: key,
        data: this.responseData.fixtures[key]
      }));
      console.log(this.groups);
      
    } else {
      console.log('No match data found in local storage.');
    }
  }

  

downloadAsPDF() {
    const data = document.getElementById('playerData');  // id of the table
    if (data) {
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            const imgWidth = 208; 
            const pageHeight = 295;  
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('table.pdf'); // Generated PDF
        });
    }
}


}
