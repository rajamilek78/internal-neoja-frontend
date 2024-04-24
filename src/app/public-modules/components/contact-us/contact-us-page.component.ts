import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, SharedService } from '@app/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';
import { RouteConstant } from '@app/helpers/constants';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { UserModel } from '@app/helpers/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.scss',
})
export class ContactUsPageComponent
  extends FormBaseComponent
  implements OnInit , OnDestroy
{
  contactUsForm!: FormGroup;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  clubID!: string;
  session_id!: string;
  
  constructor(
    private commonService: CommonService,
    private snackbarService: SnackBarService,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService,
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initContactUsForm();
    this.userSubscriber();
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }

  initContactUsForm() {
    this.contactUsForm = this.createForm({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          this.session_id = this.userDetail?.session_id
        }
      });
  };

  onClickSubmit() {
    if (this.contactUsForm.valid) {
    const bodydata = this.contactUsForm.value
      const body = {
        ...bodydata,
        session_id : this.session_id
      }
      this.commonService.contactUs(body).subscribe({
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
