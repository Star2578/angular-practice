import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwitchDirective } from '../directives/switch.directive';
import { FlyawayDirective } from '../directives/flyaway.directive';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShareService } from '../share.service';
import { DateFormatPipe } from '../pipes/date-format.pipe';

@Component({
  selector: 'app-demographic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SwitchDirective, FlyawayDirective, DateFormatPipe],
  templateUrl: './demographic.component.html',
  styleUrl: './demographic.component.css',
})
export class DemographicComponent {
  isLight!: boolean;
  isScared!: boolean;
  private subscription!: Subscription;
  private isMouseOver = false;
  maxDate: string = new Date().toISOString().split('T')[0];

  group: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    middlename: new FormControl(null, []),
    lastname: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    age: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(18)]),
    gender: new FormControl("", [Validators.required]),
  });

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.subscription = this.shareService.isLight$.subscribe(isLight => {
      this.isLight = isLight;
    });

    // Add value change listener to dateOfBirth form control
    this.group.get('dateOfBirth')!.valueChanges.subscribe(value => {
      if (value) {
        this.group.get('age')!.setValue(this.getAge(value));
      }
    });

    this.group.get('age')!.valueChanges.subscribe(value => {
      let dateOfBirth = this.group.get('dateOfBirth')?.value;
      
      if (value != this.getAge(dateOfBirth)) {
        this.group.get('age')!.setValue(this.getAge(dateOfBirth));
      }
    })
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

  private getAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // Unsubscribe when it's not needed anymore
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
