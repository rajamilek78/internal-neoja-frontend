import { Component, ElementRef, HostListener} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-upload-player-file',
  templateUrl: './upload-player-file.component.html',
  styleUrl: './upload-player-file.component.scss'
})
export class UploadPlayerFileComponent {
  files: File[] = [];
  isDragging: boolean = false;

  constructor(private el : ElementRef){}

  // to handle drag and drop 

  @HostListener('dragover', ['$event']) onDragOver(event:any) {
    event.preventDefault();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event:any) {
    this.isDragging = false;
  }

  @HostListener('drop', ['$event']) onDrop(event:any) {
    event.preventDefault();
    this.isDragging = false;

    const transferredFiles = event.dataTransfer.files;
    for (let i = 0; i < transferredFiles.length; i++) {
      this.files.push(transferredFiles.item(i));
    }
  }
// to handle selected file 

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files: FileList = inputElement.files;
      for (let i = 0; i < files.length; i++) {
        if (this.files.length < 3) {
          const file = files.item(i);
          if (file) {
            const fileType = file.name.split('.').pop();
  
            if (fileType === 'txt' || fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
              this.files.push(file);
            } else {
              alert('Invalid file type. Only .txt, .csv, and .xls files are allowed.');
            }
          }
        } else {
          alert('You can only upload a maximum of 3 files at a time.');
          break;
        }
      }
    }
  }
  
  

  onFileRemoved(file: File) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  onFileDropped(event: CdkDragDrop<File[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }
}
