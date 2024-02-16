import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-upload-player-container',
  templateUrl: './upload-player-container.component.html',
  styleUrl: './upload-player-container.component.scss'
})
export class UploadPlayerContainerComponent {
  playerCount = 5; // Default number of players
  selectedFormat = '1';
  constructor ( private cdr : ChangeDetectorRef){}
  onRadioButtonChange() {
    this.cdr.detectChanges();
  }


}
