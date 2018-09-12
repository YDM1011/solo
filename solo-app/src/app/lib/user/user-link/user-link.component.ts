import {Component, Input, OnInit} from '@angular/core';

class Profile {
  imgUrl: string;
  name: string;
}

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css']
})
export class UserLinkComponent implements OnInit {

  @Input() profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
