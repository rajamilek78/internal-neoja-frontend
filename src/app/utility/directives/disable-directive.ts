import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[disableFormControl]',
})
export class DisableFormControlDirective {
  constructor(private ngControl: NgControl) { }

  @Input() set disableFormControl(condition: boolean) {
    const action: 'disable' | 'enable' = condition ? 'disable' : 'enable';
    setTimeout(() => {
      this.ngControl.control?.[action]();
    });
  }
}
