import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() photos;
  @Output() onShow = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
