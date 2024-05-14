import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedCommonService, SnackBarService } from '@app/core';

@Component({
  selector: 'app-code-dialogue',
  templateUrl: './code-dialogue.component.html',
  styleUrl: './code-dialogue.component.scss',
})
export class CodeDialogueComponent {
  enteredCode: string = '';

  constructor(
    private dialogue: MatDialogRef<CodeDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private SharedCommonService: SharedCommonService,
    private snackBarService: SnackBarService
  ) {}

  close() {
    this.dialogue.close();
  }

  submitCode(): void {
    if (this.enteredCode === '1234') {
      this.SharedCommonService.setIsAuthenticated(true);
      this.dialogue.close(this.data.card);
      this.router.navigate([this.data.card]);
    } else {
      this.snackBarService.openSnackBar('Please Enter valid code ');
    }
  }
}
