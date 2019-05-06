import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {Product, ProductObj} from "./product";

@Component({
  selector: 'app-pop-prod-add',
  templateUrl: './pop-prod-add.component.html',
  styleUrls: ['./pop-prod-add.component.css'],
  animations: [
    trigger('inOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('140ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('120ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('inPop', [
      transition(':enter', [
        style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }),
        animate('220ms', style({
          transform: 'scaleX(1) scaleY(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('120ms', style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class PopProdAddComponent implements OnInit,OnChanges,OnDestroy {

  @Input() selfBtn;
  @Input() isShow=false;
  @Output() isShowChange=new EventEmitter<any>();

  @Input() dish;
  @Input() menuId;
  @Input() boxId;
  @Input() categoryId;
  public product:Product = new ProductObj;

  public complement;
  public dishData;
  public totalPrice: number = 0;
  public isComplement = false;
  public comment;
  public portion = [];
  public complements = [];
  public complementsM = [];
  public complementsOpt = [];
  public complementsOptM = [];

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
    s.totalPrice = parseInt(s.dishData.prt.price);
    console.log("OK");
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.totalPrice += parseInt(item.price) * parseInt(item.count);
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
    s.totalPrice = parseInt(s.dishData.prt.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.totalPrice += parseInt(item.price) * parseInt(item.count);
      }
    })
  }
  inc(item){
    const s= this;
    item.count = item.count+1;
    item.isCheck=true;
    s.totalPrice = parseInt(s.dishData.prt.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.totalPrice += parseInt(item.price) * parseInt(item.count);
      }
    })
  }
  preToBasket(){
    let s = this;
    s.dishData = Object.assign({}, s.dish);
    s.getComp();
    if(s.dishData.prt){
      s.totalPrice = s.dishData.prt.price;
      s.dishData.prt.count = 1;
      // s.portion = [];
      // s.portion[0] = s.dishData.prt;
      // s.dishData.portion.map(prt=>{
      //   if (prt._id != s.dishData.prt._id){
      //     prt.count = 0;
      //     s.portion.push(prt);
      //   }
      // });
      // s.portion = s.dishData.portion
    }
    s.api.get('checkboxCom', s.dishData.dishcategory).then((val:any)=>{
      val.map(item=>{
        item.isCheck = false;
        item.count = 1;
      });
      s.complement = val;
      console.log(s.complement)
    })
  }

  getComp(){
    let self = this;
    this.api.get('checkBox').then((res: any) => {
      if (res) {
        self.complementsOpt = [];
        self.complements = [];
        res.map((item: any) => {
          self.complementsOpt.push({
            check: false,
            label: item.name,
            id: item._id
          });
        });
        res.map((item: any) => {
          self.complements.push({
            check: false,
            label: item.name,
            id: item._id
          });
        });
      }
      self.ComMap()
    }).catch((err: any) => {});
  }

  ComMap(){
    let self = this;
    self.complementsM = [];
    self.complementsOptM = [];
    self.dishData.dishingredient.map(ing=>{
      self.complements.map(it=>{
        if(ing == it.id){
          it.check = true;
          self.complementsM.push(it.label);
        }
      })
    });
    self.dishData.ingredientis.map(ing=>{
      self.complementsOpt.map(it=>{
        if(ing == it.id){
          it.check = true;
          self.complementsOptM.push(it);
        }
      })
    });
  }

  cancel(){
    let s = this;
    s.hidden();
    s.isShowChange.emit(false);
  }

  toBasket() {
    const s = this;
    s.product.dishData = s.dishData._id;
    s.product.portItemData = s.dishData.prt._id;
    s.product.menuData = s.menuId;
    s.product.categoryData = s.categoryId;
    s.product.boxData = s.boxId;
    s.product.count = 1;
    s.product.complementData = [];
    s.product.orderCommentData.push({text:s.comment});

    s.complement.map(com=>{
      if (com.isCheck){
        s.product.complementData.push({id:com._id,count:com.count});
      }
    });

    s.api.post('product', s.product).then((res: any) => {
      console.log(res);
    });
    s.hidden();
  }
  hidden() {
    this.isShow = !this.isShow;
    document.querySelector('body').style.overflow = (this.isShow) ? 'hidden' : '';
  }
}
