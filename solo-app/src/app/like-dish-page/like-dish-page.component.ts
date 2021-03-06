import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-like-dish-page',
  templateUrl: './like-dish-page.component.html',
  styleUrls: ['./like-dish-page.component.css'],
  animations: [
    trigger('inOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('140ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('140ms', style({ opacity: 0 }))
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
export class LikeDishPageComponent implements OnInit {
  public domain: string = environment.apiDomain;

  public id:any;
  public obj:any;
  public fullPic: boolean;
  public photos:any = [];
  public load = true;

  currentIndex = 0;
  speed = 5000;
  direction = 'right';
  directionToggle = true;
  autoplay = false;
  avatars = '1234567891234'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private cookie: CookieService,
    private api: FormApiService,
    private el:ElementRef
  ) { }

  ngOnInit() {
    const s = this;
    s.id = location.href.split("user/")[1].split("/")[0];
    s.obj = JSON.stringify({id: s.id});
    this.load = false;
    s.route.params.subscribe((params: any) => {
      s.id = location.href.split("user/")[1].split("/")[0];
      s.obj = JSON.stringify({id: s.id});
      s.apiInitial(s.id);
    });
  }
  apiInitial(idc) {
    const self = this;
    this.http.get(this.domain + '/api/getLikeDish/all/' + idc, this.api.getHeaders())
      .subscribe((photo: any) => {
        self.photos = (photo);
        if (self.photos.length > 0) {
          self.photos.map(item => {
            item[item._id] = self.checkIconActive(item.dishlike);
          });
        }
        this.load = true;
      });
  }
  show(i){
    this.fullPic = true;
    this.currentIndex = i;
    this.hidden();
  }
  hide(ev){
    if (ev.target == this.el.nativeElement.querySelector('.md-fixed')){
      this.fullPic = false;
      this.hidden()
    }
  }
  select(obj, dish) {
    dish.prt = obj;
  }
  hidden(){
    document.querySelector('body').style.overflow = this.fullPic ? 'hidden' : '';
  }
  checkIconActive(arr){
    let s = this;
    let is = false;
    if (!arr) return;
    if (arr.length==0) return;
    arr.map(it=>{
      if(it == s.cookie.get('userid')){
        is = true;
      }
    });
    if (is) return true;
    else return false;
  }
}
