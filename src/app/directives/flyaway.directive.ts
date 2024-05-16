import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFlyaway]',
  standalone: true
})
export class FlyawayDirective {

  isScared:boolean = false;

  @Input() set appFlyaway(value:boolean) {
    this.isScared = value;
    this.updateState();
  }

  constructor(private el: ElementRef) {
    this.updateState();
  }

  updateState() {
    if (this.isScared) this.flyAway();
    else this.originalPosition();
  }

  originalPosition() {
    this.el.nativeElement.style.position = 'inherit';
    this.el.nativeElement.style.transform = 'none';
  }
  
  flyAway() {
    this.el.nativeElement.style.transition = 'transform 1.0s ease-out';
    this.el.nativeElement.style.position = 'relative';
    
    // Add a small timeout to ensure the transition is applied after changing the position
    setTimeout(() => {
      // Apply transformation to move the element out of sight
      this.el.nativeElement.style.transform = 'translateY(-100vh)';
    }, 0);
  }

}
