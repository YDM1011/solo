import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-fudcoin',
  templateUrl: './fudcoin.component.html',
  styleUrls: ['./fudcoin.component.css']
})
export class FudcoinComponent implements OnInit {

  public tab = 1;
  public obj = {mobile: '', foodcoin: ''};
  public fudcoins = [];
  public ests = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    const s = this;
    s.fudcoins = [];
    s.ests = [];
    s.api.apiGet('foodCoin?limit=20&skip=0&sort={"data":-1}').then((val: any) => {
      if (val) {
        s.fudcoins = val;
      }
    }).catch(e => {
      console.log(e);
    });
   this.reinit();
  }
  reinit() {
    const s = this;
    s.api.apiGet('establishment?limit=20&skip=0&sort={"data":-1}&select=subdomain,foodCoin').then((val: any) => {
      if (val) {
        s.ests = val;
      }
    }).catch(e => {
      console.log(e);
    });
  }

  more() {
    const s = this;
    s.api.apiGet('foodCoin?limit=20&skip=' + (s.fudcoins.length) + '&sort={"data":-1}').then((val: any) => {
      if (val) {
        if (val.length > 0) {
          s.fudcoins = s.fudcoins.concat(val);
        }
      }
    });
  }

  moreEst() {
    const s = this;
    s.api.apiGet('establishment?limit=20&skip=' + (s.ests.length) + '&sort={"data":-1}&select=subdomain,foodCoin').then((val:any)=>{
      if (val) {
        s.ests = s.ests.concat(val);
      }
    });
  }

  searchEst() {
    this.reinit();
  }

  addCoin(e) {
    e.preventDefault();
    const s = this;
    if (!s.obj.foodcoin || !s.obj.mobile) {
      swal.fire("Error", 'Заповніть всі поля', "error");
      return;
    }
    s.obj['data'] = new Date().toISOString();
    s.api.apiPost('foodCoin', s.obj).then((val: any) => {
      if (val) {
        if (val.mess) {
          swal.fire("Success", val.mess, "success");
        } else {
          s.fudcoins = val.concat(s.fudcoins);
        }
      }
    });
    s.obj = {mobile: '', foodcoin: ''};
  }

  addBalance(e, est) {
    e.preventDefault();
    const s = this;
    s.api.apiPost('establishment/' + est._id, {foodCoin: parseInt(est.foodCoin)}).then((val: any) => {
      if (val) {
        if (val.mess) {
          swal.fire("Success", val.mess, "success");
        } else {
        }
      }
    });
  }
}
