import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSwitch]',
  standalone: true
})
export class SwitchDirective {

  isLight: boolean = false;

  @Input() set appSwitch(value: boolean) {
    this.isLight = value;
    this.applyMode();
  }

  constructor(private el: ElementRef) {
    this.applyMode();
  }

  private applyMode() {
    if (this.isLight) {
      this.LightMode();
    } else {
      this.DarkMode();
    }
  }

  LightMode() {
    this.el.nativeElement.style.backgroundColor = 'white';
    this.el.nativeElement.style.color = 'black';
    this.el.nativeElement.style.border = '1px solid black';
    this.isLight = true;
  }

  DarkMode() {
    this.el.nativeElement.style.backgroundColor = 'black';
    this.el.nativeElement.style.color = 'white';
    this.el.nativeElement.style.border = '1px solid white';
    this.isLight = false;
  }

}
