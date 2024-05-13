import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  template: ''
})
export class FormBaseComponent implements OnChanges {
  // Angular variables
  @Input() canFocusField!: boolean;
  @ViewChild('initialFormField', { static: true }) initialFormField;

  // State Variables
  isInvalidCtrlSelected = false;
  submitted = false;

  constructor(protected fb: FormBuilder) { }

  //  Life cycle methods
  ngOnChanges(changes: SimpleChanges) {
    if (this.initialFormField && this.canFocusField) {
      this.initialFormField.nativeElement.focus();
    }
  }

  /**
   * On create form
   * @param controlsConfig
   * @param extraConfig
   */
  protected createForm(controlsConfig, extraConfig = {}): FormGroup {
    const form = this.fb.group(controlsConfig, extraConfig);
    return form;
  }

  /**
   * On form submit method
   * @param form
   */
  protected onSubmit(form) {
    this.submitted = true;
    if (!form.valid) {
      this.isInvalidCtrlSelected = false;
      this.highlightFirstInvalidControl(form);
      return false;
    }
    return true;
  }

  highlightFirstInvalidControl(group: FormGroup | FormArray) {
    if (group?.controls) {
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.controls[key];
        if (
          abstractControl &&
          (abstractControl instanceof FormGroup ||
            abstractControl instanceof FormArray)
        ) {
          this.highlightFirstInvalidControl(abstractControl);
        } else {
          if (abstractControl?.invalid) {
            if (this.isInvalidCtrlSelected) {
              abstractControl?.markAsUntouched({ onlySelf: true });
            } else {
              this.isInvalidCtrlSelected = true;
              abstractControl?.markAsTouched({ onlySelf: true });

              if (abstractControl?.nativeElement) {
                abstractControl?.nativeElement.focus();
              }
            }
          }
        }
      });
    }
  }

  /**
   * Form Field Blur method
   * @param formName
   * @param formControls
   */
  onBlur = (formName) => {
    for (const field in formName.controls) {
      const control = formName.get(field);
      control.markAsUntouched({ onlySelf: true });
    }
    return;
  };

  /**
   * @param formControl(Required Field)
   */
  isRequiredField = (formControl) => {
    return formControl.touched && formControl.hasError('required');
  };

  /**
   * @param formControlName(Valid field)
   */
  isValidField = (formControlName) => {
    return formControlName.touched && formControlName.hasError('pattern');
  };

  isInvalidDateField = (formControlName) => {
    return formControlName.touched && formControlName.invalid;
  };

  getDatePickerErrors = (ctrl) => {
    if (Object.keys(ctrl.errors).length === 1) {
      return Object.keys(ctrl.errors)[0];
    } else {
      return Object.keys(ctrl.errors)[2];
    }
  };

  /**
   * @param formControlName(Valid Length)
   */
  isValidLength = (formControlName) => {
    return (
      formControlName.touched &&
      (formControlName.hasError('minlength') ||
        formControlName.hasError('maxlength'))
    );
  };

  /**
   * @param formControlName
   */
  isValidNumber = (formControlName) => {
    return (
      formControlName.touched &&
      (formControlName.hasError('min') || formControlName.hasError('max'))
    );
  };

  /**
   * @param errorName
   * @param formGroup
   * @param formControl
   * @param submitted
   * Custom Validation method
   */
  hasError = (errorName, formGroup, formControl, submitted) => {
    return submitted && formGroup.hasError(errorName) && formControl.dirty;
  };
}