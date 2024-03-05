import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-round-format-two',
  templateUrl: './print-round-format-two.component.html',
  styleUrl: './print-round-format-two.component.scss'
})
export class PrintRoundFormatTwoComponent implements OnInit{
  @Input() groups : any;

ngOnInit(): void {
  console.log(this.groups);
}

}
