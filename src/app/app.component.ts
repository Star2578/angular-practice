import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { SwitchDirective } from './directives/switch.directive';
import { ShareService } from './share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, CommonModule, SwitchDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
  isLight!: boolean;
  private subscription!: Subscription;
  show: boolean = window.location.pathname === "/";

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.subscription = this.shareService.isLight$.subscribe(isLight => {
      this.isLight = isLight;
    });
  }

  toggleMode() {
    this.shareService.toggleLightMode();
  }

  // Unsubscribe when it's not needed anymore
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
