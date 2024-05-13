import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  body: any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.body = this.data;
  }

  onCloseClick = () => {
    this.snackBarService.closeSnackBar();
  };
}
