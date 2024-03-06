import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-container',
  templateUrl: './print-container.component.html',
  styleUrl: './print-container.component.scss'
})
export class PrintContainerComponent {
  @Input() data : any;
  @Input() groups : any;
  @Input() clubID : any;
  @Input() roundCount! : string;
  @Input() header:any;
  // groups : any;
  ngOnInit(): void {
    this.header = this.data.header || this.data.round.header;
     /*console.log(this.data);
    console.log(this.groups);*/
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }


}
