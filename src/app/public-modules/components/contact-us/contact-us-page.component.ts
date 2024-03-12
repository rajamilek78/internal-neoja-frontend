import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';
import { RouteConstant } from '@app/helpers/constants';
import { SnackBarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.scss',
})
export class ContactUsPageComponent
  extends FormBaseComponent
  implements OnInit
{
  contactUsForm!: FormGroup;
  constructor(
    private commonService: CommonService,
    private snackbarService: SnackBarService,
    private router: Router,
    fb: FormBuilder
  ) {
    super(fb);
  }
  ngOnInit(): void {
    this.initContactUsForm();
  }
  initContactUsForm() {
    this.contactUsForm = this.createForm({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onClickSubmit() {
    if (this.contactUsForm.valid) {
      this.commonService.contactUs(this.contactUsForm.value).subscribe({
        next: (res: any) => {
          this.contactUsForm.reset();
          this.router.navigate([`${RouteConstant.HOME_PAGE}`]);
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
        },
      });
    }
  }
}
