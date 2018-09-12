import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-link',
  templateUrl: './news-link.component.html',
  styleUrls: ['./news-link.component.css']
})
export class NewsLinkComponent implements OnInit {

  @Input() newsValue: number;

  constructor() { }

  ngOnInit() {
  }

}
