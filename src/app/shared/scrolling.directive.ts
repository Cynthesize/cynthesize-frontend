import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrolling]'
})
export class ScrollingDirective {
  constructor() {}
  @HostListener('document:scroll', ['$event.target'])
  onClick(event: any) {
    console.log('button', event, 'number of clicks:');
  }
}
