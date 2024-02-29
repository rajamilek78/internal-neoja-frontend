import { group } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgxPrintService,PrintOptions } from 'ngx-print';

@Component({
  selector: 'app-print-round',
  templateUrl: './print-round.component.html',
  styleUrl: './print-round.component.scss'
})
export class PrintRoundComponent implements OnInit{
  constructor(private printService : NgxPrintService){}
 @Input() data : any;
 groups : any;
  

  ngOnInit(): void {
    this.groups = this.data;
    console.log(this.groups);
    
    
  }
  print(){
    const printOptions : PrintOptions = {
      printSectionId: 'print',
      printTitle: '',
      useExistingCss: false,
      bodyClass: '',
      openNewTab: false,
      previewOnly: false,
      closeWindow: false,
      printDelay: 0
    }
    this.printService.print(printOptions);
  }

}
