import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDisplayComponent } from '../dashboard-display/dashboard-display.component';
import { DashboardOptionsComponent } from '../dashboard-options/dashboard-options.component';
import { ShareService } from '../share.service';
import { Subscription } from 'rxjs';
import { SwitchDirective } from '../directives/switch.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardDisplayComponent, DashboardOptionsComponent, SwitchDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any;
  selectedOption: string = 'profile';
  isLight!:boolean;
  private userSubscription!: Subscription;
  private lightSubscription!: Subscription;

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.userSubscription = this.shareService.getUser().subscribe(data => {
      this.user = data.results[0];
    });

    this.lightSubscription = this.shareService.isLight$.subscribe(isLight => {
      this.isLight = isLight;
    });
  }

  ngDoCheck(): void {
    console.log(this.isLight)
  }

  onOptionSelected(option: string): void {
    this.selectedOption = option;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.lightSubscription) {
      this.lightSubscription.unsubscribe();
    }
  }
}
