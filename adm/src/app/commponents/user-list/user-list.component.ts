import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../service/api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() estId;
  @Output() onClose = new EventEmitter();
  @Output() onRes = new EventEmitter();
  public uss:any;
  public host = environment.host;

  constructor(
    private api: ApiService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
  }

  getUss(e){
    this.uss = e;
    this.setCheck()
  }

  generateList(){
    let s = this;

    console.log(s.parseUserId());
    // {_id:req.userId}, {$push:{myEstablishment:doc._id}}
    let obj = {estId:s.estId};
    let objNo = {$pull:{myEstablishment:s.estId}};
    let usersId = s.parseUserId();
    let usersNoId = s.parseNoUserId();
    if (usersId){
      usersId.map(id=>{
        s.api.apiPost('permisionUser',obj, id).then(v=>{
          this.onRes.emit(v)
        }).catch(e=>{});
      });
      usersNoId.map(id=>{
        s.api.apiPost('permisionUser',objNo, id).then(v=>{
          this.onRes.emit(v)
        }).catch(e=>{});
      });
    }

    this.estId = '';
    this.uss = '';
    this.onClose.emit(true);

  }

  close(){
    this.estId = '';
    this.uss = '';
    this.onClose.emit(true)
  }

  parseUserId(){
    let arr = [];
    if (!this.uss) return null;
    this.uss.map(it=>{
      if(it.check){
        arr.push(it._id)
      }
    });
    return arr;
  }

  parseNoUserId(){
    let arr = [];
    if (!this.uss) return null;
    this.uss.map(it=>{
      if(!it.check){
        arr.push(it._id)
      }
    });
    return arr;
  }

  setCheck(){
    this.uss.map(it=>{
      it.myEstablishment.map(est=>{
        if(est._id == this.estId){
          it.check = true;
        }
      })
    });
  }
}
