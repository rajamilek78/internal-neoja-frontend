import { Component, Input, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-round-format-one',
  templateUrl: './print-round-format-one.component.html',
  styleUrl: './print-round-format-one.component.scss'
})
export class PrintRoundFormatOneComponent implements OnInit{
  @Input() data : any;
  @Input() groups : any;
  @Input() clubID : any;
  header:any;
  // groups : any;
  ngOnInit(): void {
    this.header = this.data.header || this.data.round.header;
    console.log(this.data);
    console.log(this.groups);
    // if(this.data){
    //   this.groups = Object.keys(this.data.round.groups || this.data.groups).map((key) =>({
    //     name : key,
    //     data : this.data.round.groups[key]
    //   }));
    // }
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
