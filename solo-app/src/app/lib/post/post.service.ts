import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private setting = new BehaviorSubject<any>(undefined);
  public onSetting = this.setting.asObservable();

  constructor() { }

  pushPost(post){
    this.setting.next(post);
  }
}
