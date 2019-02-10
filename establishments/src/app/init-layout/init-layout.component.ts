import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../service/api.service';
import {environment} from "../../environments/environment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-init-layout',
  templateUrl: './init-layout.component.html',
  styleUrls: ['./init-layout.component.css']
})
export class InitLayoutComponent implements OnInit {

  public isHome = true;
  public thebest: any;
  public workTime;
  public favorite: any;
  public pics: any;
  public name: any;
  public host: string = environment.host;
  public isChangeEstPop:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
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
        case'oneest': s.verifyLike(val); break;
        case'est': s.favorite = val; break;
      }

    });
  }

  resetEst() {
    const s = this;
    s.isChangeEstPop = false;
    s.api.post('resetEst', {}).then((val: any) => {
      s.verifyLike(val)
    });
  }

  verifyLike(val){
    let s = this;
    console.log(val);
    if (val.mes == 'checked'){
      s.isChangeEstPop = true;
    }else if(val.length > 0){
      s.thebest = val;
    }

  }
}
