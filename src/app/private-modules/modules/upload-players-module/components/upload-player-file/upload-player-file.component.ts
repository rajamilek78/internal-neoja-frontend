import { Component, ElementRef, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiManagerService } from '../../../../../core/services';
import { Router } from '@angular/router';
import { RouteConstant } from '../../../../../helpers/constants';

@Component({
  selector: 'app-upload-player-file',
  templateUrl: './upload-player-file.component.html',
  styleUrl: './upload-player-file.component.scss'
})
export class UploadPlayerFileComponent {
  files: File[] = [];
  isDragging: boolean = false;

  constructor(
    private el: ElementRef,
    private api: ApiManagerService,
    private router: Router
  ) { }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.isDragging = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    this.isDragging = false;

    const transferredFiles = event.dataTransfer.files;
    for (let i = 0; i < transferredFiles.length; i++) {
      if (this.files.length + i < 3) {
        this.files.push(transferredFiles.item(i));
      } else {
        alert('You can only upload a maximum of 3 files at a time.');
        break;
      }
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files: FileList = inputElement.files;
      for (let i = 0; i < files.length; i++) {
        if (this.files.length < 3) {
          const file = files.item(i);
          if (file) {
            const fileType = file.name.split('.').pop();
            if (['txt', 'csv', 'xlsx', 'xls', 'json'].includes(fileType || '')) {
              this.files.push(file);
            } else {
              alert('Invalid file type. Only .txt, .csv,.json and .xls files are allowed.');
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

  onUpload() {
    this.files.forEach((file) => {
      const fileType = file.name.split('.').pop();
      if (['csv', 'xls', 'xlsx'].includes(fileType || '')) {
        this.api.post('csv', file).subscribe(response => {
          localStorage.setItem('matchData', JSON.stringify(response));
        });
      } else {
        const data = new FormData();
        data.append('players', file);
        this.api.postFile('file', data).subscribe(response => {
          localStorage.setItem('matchData', JSON.stringify(response));
        });
      }
    });
    this.router.navigate([RouteConstant.LEAGUE_CONTAINER]);
  }
}