import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDisplayComponent } from '../dashboard-display/dashboard-display.component';
import { SwitchDirective } from '../directives/switch.directive';
import { ShareService } from '../share.service';
import { Subscription } from 'rxjs';
import { RecursiveWarningDirective } from '../directives/recursive-warning.directive';

@Component({
  selector: 'app-dashboard-options',
  standalone: true,
  imports: [CommonModule, DashboardDisplayComponent, SwitchDirective, RecursiveWarningDirective],
  templateUrl: './dashboard-options.component.html',
  styleUrl: './dashboard-options.component.css',
})
export class DashboardOptionsComponent {
  @Output() optionSelected = new EventEmitter<string>();
  isLight!: boolean;
  private subscription!: Subscription;

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.subscription = this.shareService.isLight$.subscribe(isLight => {
      this.isLight = isLight;
    });
  }

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }

  reload() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
