import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonService, SharedService } from '../../../../../core/services';
import { Router } from '@angular/router';
import { RouteConstant } from '../../../../../helpers/constants';
import { SharedCommonService } from '../../../../../helpers/services';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { DatePipe } from '@angular/common';
import { SnackBarService } from '@app/core/services/snackbar.service';
@Component({
  selector: 'app-upload-player-file',
  templateUrl: './upload-player-file.component.html',
  styleUrl: './upload-player-file.component.scss',
})
export class UploadPlayerFileComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  files: File[] = [];
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  isDragging: boolean = false;
  @Input() leagueIdPass: any;
  @Input() roundCount!: number | undefined;
  @Input() selectedDate!: Date;
  @Input() selectedLeague: any;

  constructor(
    private commonservice: CommonService,
    private SharedCommonService: SharedCommonService,
    private snackbarService: SnackBarService,
    private router: Router,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.userSubscriber();
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
      });
  };

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

  onFileSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files: FileList = inputElement.files;
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file && this.files.length < 3) {
          const fileType = file.name.split('.').pop();
          if (['txt', 'csv', 'xlx', 'xlsx'].includes(fileType || '')) {
            this.files = [...this.files, file];
          } else {
            alert('Invalid file type');
          }
        } else {
          alert('You can only upload a maximum of 3 files at a time');
          break;
        }
      }
    }
    inputElement.value = '';
  }

  onFileRemoved(file: File) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    this.fileInput.nativeElement.value = '';
  }

  onFileDropped(event: CdkDragDrop<File[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }
  onUpload() {
    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'MM/dd/yyyy'
    );
    const clubID = this.userDetail?.club_id;
    const clubLeagueStr = `${clubID}/${this.leagueIdPass}`;

    // Loop through each file to upload
    this.files.forEach((file) => {
      const data = new FormData();
      data.append('players', file);
      if (this.roundCount !== null) {
        data.append('round', String(this.roundCount));
      }
      if (formattedDate !== null) {
        data.append('date', formattedDate);
      }
      this.commonservice.uploadFile(clubLeagueStr, data).subscribe({
        next: (res: any) => {
          this.SharedCommonService.setMatchData(res);
          this.router.navigate([
            RouteConstant.LEAGUE_CONTAINER,
            {
              leagueID: this.leagueIdPass,
              leagueName: this.selectedLeague.name,
            },
          ]);
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
          console.log(err);
        },
      });
    });
  }
}
