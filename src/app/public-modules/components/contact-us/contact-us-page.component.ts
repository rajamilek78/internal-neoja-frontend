import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormBaseComponent } from '@app/utility/components';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.scss'
})
export class ContactUsPageComponent extends FormBaseComponent implements OnInit{
  contactUsForm! : FormGroup
  constructor(
    private commonService : CommonService,
    fb : FormBuilder
    ){super(fb)}
  ngOnInit(): void {
    this.initContactUsForm();
  }
  initContactUsForm(){
    this.contactUsForm = this.createForm({
      first_name : ['',[Validators.required]],
      last_name : ['',[Validators.required]],
      email : ['',[Validators.required]],
      message : ['',[Validators.required]]
    })
  }

  onClickSubmit(){
    if(this.contactUsForm.valid){
    this.commonService.contactUs(this.contactUsForm.value).subscribe({
      next : (res : any)=>{
        console.log(res);
      },
      error : (err : any)=>{
        console.log(err);
        }
    });
  }
}
  

}
