import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDateFormat]',
})
export class DateFormatDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = (event.target as HTMLInputElement)?.value; // Optional chaining
    if (input) {
      let value = input.replace(/\D/g, ''); // Remove non-numeric characters
      if (value.length > 0) {
        value = value.match(new RegExp('.{1,2}', 'g'))!.join('/'); // Non-null assertion operator
      }
      this.renderer.setProperty(event.target, 'value', value);
    }
  }
}
