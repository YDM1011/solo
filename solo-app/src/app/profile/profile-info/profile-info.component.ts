import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Output() onShow = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
