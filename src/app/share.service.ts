import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private _isLight: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLight$ = this._isLight.asObservable();

  get isLight(): boolean {
    return this._isLight.value;
  }

  constructor() { }

  toggleLightMode() {
    this._isLight.next(!this._isLight.value);
  }
}
