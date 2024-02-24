import { Component } from '@angular/core';
import { NgxPrintService,PrintOptions } from 'ngx-print';

@Component({
  selector: 'app-print-round',
  templateUrl: './print-round.component.html',
  styleUrl: './print-round.component.scss'
})
export class PrintRoundComponent {
  constructor(private printService : NgxPrintService){}
  print(){
    const printOptions : PrintOptions = {
      printSectionId: '#print',
      printTitle: '',
      useExistingCss: false,
      bodyClass: '',
      openNewTab: true,
      previewOnly: false,
      closeWindow: false,
      printDelay: 0
    }
    this.printService.print(printOptions);
  }

}
