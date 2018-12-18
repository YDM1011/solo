import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-pop-prod-add',
  templateUrl: './pop-prod-add.component.html',
  styleUrls: ['./pop-prod-add.component.css']
})
export class PopProdAddComponent implements OnInit,OnChanges,OnDestroy {

  @Input() selfBtn;
  @Input() isShow=false;
  @Output() isShowChange=new EventEmitter<string>();

  @Input() dish;
  @Input() dishId;

  public complement;
  public dishData;
  public totalPrice = 0;
  public isComplement = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {

  }
  ngOnChanges(){
  }

  ngOnDestroy(){}

  calcPrice(item){
    let s = this;
    item.isCheck = !item.isCheck;
    s.totalPrice = parseInt(s.dishData.price);
    console.log("OK");
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.totalPrice += parseInt(item.price);
      }
    })
  }

  dec(item){
    const s= this;
    if (item.count > 1) {
      item.count = item.count-1
    }else{
      item.isCheck=false;
    }
    s.totalPrice = parseInt(s.dishData.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.totalPrice += parseInt(item.price) * item.count;
      }
    })
  }
  inc(item){
    const s= this;
    item.count = item.count+1;
    item.isCheck=true;
    s.totalPrice = parseInt(s.dishData.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.totalPrice += parseInt(item.price) * item.count;
      }
    })
  }
  preToBasket(){
    let s = this;
        s.dishData = Object.assign({}, s.dish);
        console.log(s.dish, s.dishId);
        if(s.dishData.prt){s.totalPrice = s.dishData.prt.price;}
        s.api.get('checkbox', s.dishData.dishcategory).then((val:any)=>{
          val.map(item=>{
            item.isCheck = false;
            item.count = 1;
          });
          s.complement = val;
          console.log(s.complement)
        })
      }

}
