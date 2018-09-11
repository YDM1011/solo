import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input() friends_new: number;

  constructor() { }

  ngOnInit() {
  }

}
