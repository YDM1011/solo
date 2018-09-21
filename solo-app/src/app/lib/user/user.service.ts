import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;

  private userdata = new BehaviorSubject<any>(undefined);
  public onUserData = this.userdata.asObservable();
  constructor() { }

  setUserData(data){
    this.userdata.next(data);
    this.user = data;
    console.log(data);
  }
}
