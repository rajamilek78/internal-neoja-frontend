import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LeagueModuleService } from '../../services/league-module.service';

@Component({
  selector: 'app-print-container',
  templateUrl: './print-container.component.html',
  styleUrl: './print-container.component.scss'
})
export class PrintContainerComponent {
  data : any;
  groups : any;
  clubID : any;
  roundCount! : string;
  header:any;

  constructor(private leagueService : LeagueModuleService){}
  // groups : any;
  ngOnInit(): void {
    console.log(this.data);
    
    this.leagueService.getRoundData().subscribe(data => {
      if(data){
        this.data = data.rawData;
        this.groups = data.groups;
        this.roundCount = data.roundCount;
        this.clubID = data.clubID;
        console.log(data);
      }
    });
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  downloadTableAsPDF() {
    const groups = document.getElementsByClassName('groupContainer');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 208;
    let imgHeight;
    let heightLeft;
    let position = 10;
  
    const promises = Array.from(groups).map((group, index) => {
      return html2canvas(group as HTMLElement, { scale: 2 }).then((canvas) => {
        imgHeight = (canvas.height * imgWidth) / canvas.width;
        heightLeft = imgHeight;
  
        const contentDataURL = canvas.toDataURL('image/png');
  
        if (index !== 0) {
          pdf.addPage();
          position = 0;
        }
  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= imgHeight;
      });
    });
  
    Promise.all(promises).then(() => {
      pdf.save('RoundData.pdf');
    });
  }


}
