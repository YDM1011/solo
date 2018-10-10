import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-show-friends',
  templateUrl: './show-friends.component.html',
  styleUrls: ['./show-friends.component.css']
})
export class ShowFriendsComponent implements OnInit {

  @Input() friends;

  constructor() { }

  ngOnInit() {
  }
}
