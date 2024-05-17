import { Component, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchDirective } from '../directives/switch.directive';
import { FlyawayDirective } from '../directives/flyaway.directive';
import { ShareService } from '../share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SwitchDirective, FlyawayDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  isLight!: boolean;
  isScared!: boolean;
  private subscription!: Subscription;
  private isMouseOver = false;

  group: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
  });

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.subscription = this.shareService.isLight$.subscribe(isLight => {
      this.isLight = isLight;
    });
  }

  ngDoCheck(): void {
    this.isScared = this.group.invalid && this.isMouseOver;
  }

  onMouseEnter() {
    this.isMouseOver = true;
  }

  onSubmit() {
    console.log("success");
    window.location.href = "/demographic";
  }

  // Unsubscribe when it's not needed anymore
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
