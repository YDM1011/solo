import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit, OnChanges {

  @Output() onDelete = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  @Input() isDel = false;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.isDel)
  }

  close(){
    this.isDel = false;
    this.onCancel.emit(false);
  }
  delete(){
    this.onDelete.emit(true);
  }
}
