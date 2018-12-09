import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  private form = new BehaviorSubject<any>(undefined);
  public onSubmit = this.form.asObservable();

  constructor(private http: HttpClient,
              private _cookieService: CookieService) { }
  private httpOptions: {withCredentials: boolean};
  getHeaders(type: string = 'application/json') {
    this.httpOptions = {
      withCredentials: true
    };
    return this.httpOptions;
  }
  defoult(e, item){
    e.target.classList.remove("error");
    item.elem.classList.remove("error");
    item.elem.innerText = item.elem.getAttribute('data-defoult-text');
    e.target.innerText = e.target.getAttribute('data-defoult-text');
  }
  error(err, valid) {
    let self = this;
    try{
      if (err.error.error && !err.error.errors) {
        return swal("Error", err.error.error, "error");
      }else
      if (err.err) {
        return swal("Error", err.err, "error");
      }else
      if (err.error.message) {
        console.log(err.error.message);
        let mess = '';
        valid.forEach(item=>{
          if(err.error.errors[item.name]){
            mess = `${mess ? mess+'!' : ''} ${err.error.errors[item.name].message}`;
            item.elem.classList.add("error");
            item.input.addEventListener('keyup', (e)=>{
              self.defoult(e, item);
            });
            item.elem.dataset['defoultText'] = item.elem.innerText;
            item.elem.innerText = err.error.errors[item.name].message;
          }
        });
        return swal("Error", mess+'!', "error");
      }
    }catch(err){}
  }
}
