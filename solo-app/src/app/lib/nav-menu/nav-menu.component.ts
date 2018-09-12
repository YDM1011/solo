import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

class Search{
  url: string;
  name: string;
}
class Profile {
  imgUrl: string;
  name: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})


export class NavMenuComponent implements OnInit {

  @Input() searchResult: Search;
  @Input() profile: Profile;
  @Input() tapeName: string;
  @Input() friendsNewValue: number;
  @Input() newsValue: number;
  @Input() basketValue: number;
  @Input() coinValue: number;

  constructor() { }

  ngOnInit() {
  }

}
