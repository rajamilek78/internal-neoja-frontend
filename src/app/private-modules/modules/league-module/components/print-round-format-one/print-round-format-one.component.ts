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

  // downloadTableAsPDF() {
  //   const data = document.getElementById('print-section'); // Replace with the id of your table
  //   if (data) {
  //     html2canvas(data, { scale: 2 }).then((canvas) => {
  //       // Few necessary setting options
  //       const imgWidth = 208;
  //       const pageHeight = 295;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       const heightLeft = imgHeight;

  //       const contentDataURL = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  //       const position = 0;
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //       pdf.save('TableData.pdf'); // Generated PDF
  //     });
  //   } else {
  //     console.error('Element not found');
  //   }
  //   // this.router.navigate(['players-league/print']);
  //   // this.printRoundComponent.print();
  // }
  // downloadTableAsPDF() {
  //   const data = document.getElementById('print-section');
  //   if (data) {
  //     html2canvas(data, { scale: 2 }).then((canvas) => {
  //       const imgWidth = 208;
  //       const pageHeight = 295;
  //       let imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;
  
  //       const contentDataURL = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  
  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }
  //       pdf.save('TableData.pdf');
  //     });
  //   } else {
  //     console.error('Element not found');
  //   }
  // }
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
      pdf.save('TableData.pdf');
    });
  }
  
  
  

}
