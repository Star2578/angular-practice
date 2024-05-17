import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareService } from '../share.service';
import { CommonModule } from '@angular/common';
import { SwitchDirective } from '../directives/switch.directive';
import { DateFormatPipe } from '../pipes/date-format.pipe';

@Component({
  selector: 'app-dashboard-display',
  standalone: true,
  imports: [CommonModule, SwitchDirective, DateFormatPipe],
  templateUrl: './dashboard-display.component.html',
  styleUrl: './dashboard-display.component.css',
})
export class DashboardDisplayComponent {
  @Input() user: any;
  @Input() selectedOption: string | undefined;

  isLight!: boolean;
  private subscription!: Subscription;

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.subscription = this.shareService.isLight$.subscribe(isLight => {
      this.isLight = isLight;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
