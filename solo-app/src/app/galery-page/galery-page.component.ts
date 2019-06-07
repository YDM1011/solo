import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-galery-page',
  templateUrl: './galery-page.component.html',
  styleUrls: ['./galery-page.component.css'],
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
export class GaleryPageComponent implements OnInit, OnDestroy {

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
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
  apiInitial(idc) {
    const self = this;
    this.http.get(this.domain + '/api/getPhoto?userId=' + idc, this.api.getHeaders())
      .subscribe((photo: any) => {
        self.photos = (photo);
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
  hidden(){
    document.querySelector('body').style.overflow = this.fullPic ? 'hidden' : '';
  }
}

