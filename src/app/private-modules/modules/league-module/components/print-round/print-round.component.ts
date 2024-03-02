import { group } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgxPrintService,PrintOptions } from 'ngx-print';
interface GroupData {
  games: {
    [key: string]: {
      bye: string[];
      returner: string;
      score: {
        team_1: number;
        team_2: number;
      };
      server: string;
      team_1: string[];
      team_2: string[];
    };
  };
}

@Component({
  selector: 'app-print-round',
  templateUrl: './print-round.component.html',
  styleUrl: './print-round.component.scss'
})
export class PrintRoundComponent implements OnInit{
  constructor(private printService : NgxPrintService){}
 @Input() data! : { name: string; data: GroupData }[];
 groups : any;
  

  ngOnInit(): void {
    console.log(this.data);
    
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
