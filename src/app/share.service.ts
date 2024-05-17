import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private _isLight: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLight$ = this._isLight.asObservable();

  get isLight(): boolean {
    return this._isLight.value;
  }

  constructor(private http:HttpClient) { }

  toggleLightMode() {
    this._isLight.next(!this._isLight.value);
  }

  getUser(): Observable<any> {
    return this.http.get<any>('https://randomuser.me/api/');
  }
}
