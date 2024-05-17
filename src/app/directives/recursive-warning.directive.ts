import { Directive, HostListener, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRecursiveWarning]',
  standalone: true
})
export class RecursiveWarningDirective {
  private clickCount = 0;
  private maxClicks = 7;
  private warnings = [
    'Click me!',
    'Warning: Do not click again!',
    'Seriously, stop clicking!',
    'This is your third warning!',
    'You really should stop now!',
    'This is getting dangerous!',
    'One more click and...!',
    'Okay, this is the last warning!',
  ];

  constructor(
    private templateRef: TemplateRef<{ warning: string}>,
    private viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      warning: this.warnings[this.clickCount] || 'Unexpected error!'
    }).rootNodes[0].addEventListener('click', () => this.handleClick());
  }

  @HostListener('click')
  handleClick() {
    this.clickCount++;
    if (this.clickCount < this.maxClicks) {
      this.createWarningElement();
    } else {
      this.closeTab();
    }
  }

  @HostListener('mouseenter') ontest() {
    console.log('mouse enter test')
  }

  private createWarningElement() {
    const newView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      warning: this.warnings[this.clickCount] || 'Unexpected error!',
    });
    newView.rootNodes[0].addEventListener('click', () => this.handleClick());
  }

  private closeTab() {
    if (confirm('I warned you :(')) {
      window.location.href = 'about:blank';
    } else {
      window.location.href = 'about:blank';
    }
  }
}
