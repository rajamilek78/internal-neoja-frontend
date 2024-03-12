import { Input, ElementRef, Directive, OnInit } from '@angular/core';

// usage 
// focus="true"
@Directive({
  selector: "[appAutofocus]"
})
export class AutofocusDirective implements OnInit {

  @Input('appAutofocus') appAutofocus!: string | boolean;
  public constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.appAutofocus) {
      // Otherwise Angular throws error: Expression has changed after it was checked.
      window.setTimeout(() => {
        this.el.nativeElement.focus(); //For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
      });
    }
  }
}
