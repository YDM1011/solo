import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-init-layout',
  templateUrl: './init-layout.component.html',
  styleUrls: ['./init-layout.component.css']
})
export class InitLayoutComponent implements OnInit {

  public isHome = true;
  public thebest: any;
  public favorite: any;
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
    console.log(this.favorite)
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
