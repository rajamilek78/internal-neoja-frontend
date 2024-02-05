import { Component, ElementRef, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiManagerService } from '../../../../../core/services';
import { SharedService } from '../../../../../helpers/services/shared.service';

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
    private sharedService : SharedService
  ) { }

  // to handle drag and drop 

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
      if (this.files.length + i >= 4) {
        alert('You can only upload a maximum of 3 files at a time.');
        break;
      }
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

            if (fileType === 'txt' || fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'json') {
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


  //to remove selected file for upload
  onFileRemoved(file: File) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  onFileDropped(event: CdkDragDrop<File[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  // onUpload() {
  //   this.files.forEach((file, index) => {
  //     const data = new FormData();
  //     const fileType = file.name.split('.').pop();
  //     // let endpoint;
  //     if(fileType === 'csv' || fileType === 'xls' || fileType === 'xlsx'){
  //       this.api.postFile('csv',data).subscribe({
  //         next : (res : any)=>{
  //           console.log(res);
  //         },
  //         error : (err : any)=>{
  //           console.log(err);
            
  //         }
  //       })
  //     }
  //     else{
      
  //       data.append('players', file);
  //       this.api.postFile('file', data).subscribe(response => {
  //         this.sharedService.setMatchData(response);
  //         console.log(response);
  //       });
  //     }
      
  //   });
  // }

  onUpload() {
    this.files.forEach((file, index) => {
      const fileType = file.name.split('.').pop();
      let reader = new FileReader();
  
      
         
  
          if (fileType === 'csv' || fileType === 'xls' || fileType === 'xlsx') {
            // For CSV, XLS, or XLSX files, send the file contents as binary data
            this.api.post('csv', file).subscribe(response => {
              this.sharedService.setMatchData(response);
              console.log(response);
            });
          } else {
            // For other file types, send the file as form data
            const data = new FormData();
            data.append('players', file);
            this.api.postFile('file', data).subscribe(response => {
              this.sharedService.setMatchData(response);
              console.log(response);
            });
          }
        
      });
  
     
    };
  }

