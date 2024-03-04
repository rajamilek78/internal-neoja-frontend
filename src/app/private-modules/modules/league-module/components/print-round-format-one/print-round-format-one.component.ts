import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-round-format-one',
  templateUrl: './print-round-format-one.component.html',
  styleUrl: './print-round-format-one.component.scss'
})
export class PrintRoundFormatOneComponent implements OnInit{
  @Input() data : any;
  @Input() groups : any;
  // groups : any;
  ngOnInit(): void {
    console.log(this.data);
    // if(this.data){
    //   this.groups = Object.keys(this.data.round.groups || this.data.groups).map((key) =>({
    //     name : key,
    //     data : this.data.round.groups[key]
    //   }));
    // }
  }
  

}
