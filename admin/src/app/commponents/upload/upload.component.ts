import {Component, OnInit, Output, EventEmitter, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnChanges {

  public pics;
  public isResult:boolean=false;
  @Output() onLoadImg: EventEmitter<any> = new EventEmitter<any>();
  @Input() btn;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
  }
  fileresult(data){
    this.pics = data;
    this.isResult = true;

  }

}
