import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../service/api.service';
import {environment} from "../../environments/environment";

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
  public host: string = environment.host;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {  }

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
    console.log(this.favorite)
  }

  getPics(){
    const s = this;
    s.api.justGet('est_pics').then((val: any) => {
      if(val){
        s.pics=val;
      }
    });
  }

  setFavorite(arg) {
    const s = this;
    s.api.post('favorite', {key: arg}).then((val: any) => {
      switch (arg) {
        case'oneest': s.thebest = val; break;
        case'est': s.favorite = val; break;
      }

    });
  }

}
