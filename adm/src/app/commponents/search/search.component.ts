import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public key;
  @Input() mod;
  @Input() id = '';
  @Input() query = '';
  @Output() onRes = new EventEmitter();
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  search(){
    let s = this;
    s.api.apiGet(s.mod,s.id,'?search="'+s.key+'"'+s.query).then(v=>{
      s.onRes.emit(v);
    })
  }

}
