import {Component, Input, ContentChild, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit  {
  private defOption;
  @Input() url: string;
  @Input() domain: string = environment.apiDomain;
  @Input() option: any;
  @Input() class: string;
  @Input() click: boolean = false;
  @Input() hidden: boolean = false;
  @Input() text: string = 'Ok';
  @Input() method: string = 'post';
  @Input() valid = [];
  @Output() onRes: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    this.defOption = this.option;
    if(this.click){
      this.apiSubmit()
    }
  }

  apiSubmit(){
    let self = this;
    switch (this.method) {
      case 'post': {
        this.http.post(`${this.domain}${this.url}`, this.option, this.api.getHeaders())
          .subscribe((post: any) => {
            if(post){
              self.api.error(post, self.valid);
              self.onRes.emit(post);
              self.option = self.defOption
            }
          },err=>self.api.error(err, self.valid));
        break;
      }
      case 'get': {
        this.http.get(`${this.domain}${this.url}`, this.api.getHeaders())
          .subscribe((posts: any) => {
            self.api.error(posts, self.valid);
            self.onRes.emit(posts)
          },(err: any)=>self.api.error(err, self.valid));
        break;
      }
      default: break;
    }

  }
}
