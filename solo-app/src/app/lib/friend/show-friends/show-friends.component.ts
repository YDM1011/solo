import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-show-friends',
  templateUrl: './show-friends.component.html',
  styleUrls: ['./show-friends.component.css']
})
export class ShowFriendsComponent implements OnInit {

  @Input() friends;
  @Output() onShow = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
}
