import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, ProductObj} from "../pop-prod-add/product";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-pop-prod-edit',
  templateUrl: './pop-prod-edit.component.html',
  styleUrls: ['./pop-prod-edit.component.css']
})
export class PopProdEditComponent implements OnInit {

  @Input() selfBtn;
  @Input() isShow=false;
  @Output() isShowChange=new EventEmitter<any>();
  @Output() onProductUpdate=new EventEmitter<any>();

  @Input() product;
  @Input() menuId;
  @Input() Basket;
  @Input() categoryId;

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
    if(this.product.orderCommentData){
      if(!this.product.orderCommentData[0]){
        this.product.orderCommentData[0] = {text:"",entity:"user"}
      }
    }
  }
  ngOnChanges(){
  }

  ngOnDestroy(){
  }

  calcPrice(item){
    let s = this;
    item.isCheck = !item.isCheck;
    // s.totalPrice = parseInt(s.product.portItemData.price);
    s.product.totalPrice = parseInt(s.product.portItemData.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.product.totalPrice += parseInt(item.price) * parseInt(item.count);
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
    s.product.totalPrice = parseInt(s.product.portItemData.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.product.totalPrice += parseInt(item.price) * parseInt(item.count);
      }
    })
  }
  inc(item){
    const s= this;
    item.count = item.count+1;
    item.isCheck=true;
    s.product.totalPrice = parseInt(s.product.portItemData.price);
    s.complement.map(item=>{
      console.log(item.isCheck);
      if (item.isCheck) {
        s.product.totalPrice += parseInt(item.price) * parseInt(item.count);
      }
    })
  }
  preToBasket(){
    let s = this;
    s.complement = [];
    s.dishData = Object.assign({}, s.product.dishData);
    s.getComp();
    if(s.product.portItemData){
      s.product.totalPrice = parseInt(s.product.portItemData.price);
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
    console.log(s.product);
    let val = s.product.categoryData.complementbox;
    if(s.product.complementData.length>0){
      s.product.complementData.map(comp=>{
        val.map(item=>{
          if (comp.id._id == item._id){
            item['isCheck'] = true;
            item['count'] = comp.count || 1;
          }else{
            item['isCheck'] = false;
            item['count'] = 1;
          }
        });
      });
    }else{
      val.map(item=>{
        item['isCheck'] = false;
        item['count'] = 1;
      });
    }


    s.complement = val;
    console.log(s.complement);
    this.calcPrice(s.complement)
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
    let obj = Object.assign({}, s.product);
    obj.dishData = s.dishData._id;
    obj.portItemData = s.product.portItemData._id;
    obj.complementData = [];
    obj.BasketId = this.Basket._id;

    // s.product.totalPrice = s.totalPrice;
    s.complement.map(com=>{
      if (com.isCheck){
        obj.complementData.push({id:com._id,count:com.count});
      }
    });

    s.api.post('product/'+s.product._id, obj).then((res: any) => {
      s.product.complementData = res.complementData;
      s.onProductUpdate.emit(s.product);
      // s.isShowChange.emit(res._id);
    });
    s.hidden();

  }
  hidden() {
    this.isShow = !this.isShow;
    document.querySelector('body').style.overflow = (this.isShow) ? 'hidden' : '';
  }
}
