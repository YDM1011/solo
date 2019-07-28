import { Component, OnInit } from '@angular/core';
import {FullOrder, OrderMax} from "./order";
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public order: OrderMax;
  public estId;
  public id;
  public apiDomain = environment.apiDomain;
  public allInThis;
  public allInAny;

  public doneButton = true;
  public changeButton = true;
  public confirmButton = true;
  public payButton = true;

  public comment;
  public totalPrice;
  public boxesPrice;
  public deliveryPrice;

  public isCanEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.Init();
  }
  Init() {
    this.estId = this.route.snapshot.paramMap.get('eid');
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.justGet(`basketsList/${this.estId}?_id=${this.id}`).then(obj => {
      this.order = new FullOrder(obj);
      console.log(this.order);
      this.isCanEdit = this.order.status === '1';
      this.api.justGet(`basketsList/count?query={"owneruser":"${this.order.client._id}","ownerest":"${this.estId}","status":"6"}`)
        .then((v: any) => {
        this.allInThis = v.count;
      });
      this.api.justGet(`basketsList/count?query={"owneruser":"${this.order.client._id}","status":"6"}`).then((v: any) => {
        this.allInAny = v.count;
      });
    });
    

  }

  confirmOrder() {
    this.confirmButton = false;
    this.api.justGet(`basketsList/count?query={"_id":"${this.order.id}","status":"2"}`).then((v: any) => {
      if (v.count != 1) {
        this.api.set('basketsList', {status: '2'}, this.estId, '', '?id=' + this.order.id).then(v => {
          if (v) {
            this.order.status = '2';
            this.confirmButton = true;
          }
        }).catch(e => {
          Swal.fire('Помилка', e.error.error.mess, 'error');
          this.confirmButton = true;
        });
      } else {
        Swal.fire('Помилка', 'Виникла помилка! Оновіть сторінку!', 'error');
        this.confirmButton = true;
      }
    });
    
  }
  doneOrder() {
    this.doneButton = false;
    this.api.justGet(`basketsList/count?query={"_id":"${this.order.id}","status":"6"}`).then((v: any) => {
      if (v.count != 1) {
        this.api.set('basketsList', {status: '6'}, this.estId, '', '?id=' + this.order.id).then(v => {
          if (v) {
            this.order.status = '6';
            this.doneButton = true;
          }
        }).catch(e => {
          Swal.fire('Помилка', e.error.error.mess, 'error');
          this.doneButton = true;
        });
      } else {
        this.doneButton = true;
        Swal.fire('Помилка', 'Виникла помилка! Оновіть сторінку!', 'error');
      }
    });
  }
  deletOrder() {
    this.api.set('basketsList', {status: '7'}, this.estId, '', '?id=' + this.order.id).then(v=>{
      if (v) {
        this.order.status = '7';
      }
    }).catch(e => {
      Swal.fire('Error', e.error.error.mess, 'error');
    });
  }
  whaitOrder() {
    this.payButton = false;
    this.api.set('basketsList', {status: '3'}, this.estId, '', '?id=' + this.order.id).then(v=>{
      if (v) {
        this.order.status = '3';
        this.payButton = true;
      }
    });
  }
  changeOrder() {
    //console.log(this.order);
    this.changeButton = false;
    this.api.justGet(`basketsList/count?query={"_id":"${this.order.id}","status":"5"}`).then((v: any) => {
      if (v.count != 1) {
        let comment = this.comment ? {entity: 'admin', text: this.comment} : null;
        let obj = {
          status: '5'
        };
        if (comment) {
          this.order.orderCommentData.push(comment);
          obj['orderCommentData'] = this.order.orderCommentData;
        }
        if (this.totalPrice) obj['totalPrice'] = this.totalPrice || this.order.productPrice;
        if (this.boxesPrice) obj['boxesPrice'] = this.boxesPrice || this.order.boxPrice;
        if (this.deliveryPrice) obj['deliveryPrice'] = this.deliveryPrice || this.order.deliveryPrice;
        //console.log(obj);

        this.api.set('basketsList', obj, this.estId, '', '?id=' + this.order.id).then(v => {
          if (v) {
            this.order.status = '5';
            this.changeButton = true;
          }
        }).catch(e => {
          Swal.fire('Error', e.error.error.mess, 'error');
          this.changeButton = true;
        });
      } else {
        Swal.fire('Помилка', 'Виникла помилка! Оновіть сторінку!', 'error');
        this.changeButton = true;
      }
    });
  }
}
