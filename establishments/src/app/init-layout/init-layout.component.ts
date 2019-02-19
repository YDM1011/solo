import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../service/api.service';
import {environment} from "../../environments/environment";
import {Title} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-init-layout',
  templateUrl: './init-layout.component.html',
  styleUrls: ['./init-layout.component.css'],
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
export class InitLayoutComponent implements OnInit, OnDestroy {

  public isHome = true;
  public thebest: any;
  public favorite: any;
  public pics: any;
  public name: any;
  public user: any;
  public isFav:boolean=false;
  public isBest:boolean=false;
  public host: string = environment.host;
  public isChangeEstPop:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cookie: CookieService,
    private titleService: Title
  ) {
    this.setTitle('Заклад')
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    const self = this;
    if (this.router.url == '/') {
      self.isHome = true;
    } else {
      self.isHome = false;
    }

    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.url == '/') {
          self.isHome = true;
        } else {
          self.isHome = false;
        }
      }
    });
    self.getPics();
    self.getName();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  getPics(){
    const s = this;
    s.api.justGet('est_pics').then((val: any) => {
      if(val){
        s.pics=val;
      }
    });
  }
  getName(){
    const s = this;
    s.api.justGet('est_name').then((val: any) => {
      if(val){
        s.name=val;
        s.setTitle(s.name.name)
      }
    });
  }

  setFavorite(arg) {
    const s = this;
    s.api.post('favorite', {key: arg}).then((val: any) => {
      switch (arg) {
        case'oneest':{
          s.verifyLike(val);
          break;
        }
        case'est':{
          s.favorite = val;
          s.isFav = s.checkIconActive(s.favorite);
          break;
        }
      }

    });
  }

  resetEst() {
    const s = this;
    s.isChangeEstPop = false;
    s.hidden();
    s.api.post('resetEst', {}).then((val: any) => {
      s.verifyLike(val)
    });
  }

  verifyLike(val){
    let s = this;
    if (val.mes == 'checked'){
      s.isChangeEstPop = true;
      s.hidden();
    }else if(val.length > 0){
      s.thebest = val;
      s.isBest = s.checkIconActive(s.thebest);
    }
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
  hidden() {
    document.body.style.overflow = (this.isChangeEstPop) ? 'hidden' : '';
  }
}
