import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friends-link',
  templateUrl: './friends-link.component.html',
  styleUrls: ['./friends-link.component.css']
})
export class FriendsLinkComponent implements OnInit {

  @Input() friendsNewValue: number;

  constructor() { }

  ngOnInit() {
  }

}
