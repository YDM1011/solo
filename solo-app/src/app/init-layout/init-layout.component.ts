import {Component, OnInit, OnChanges} from '@angular/core';
import { AuthService } from '../auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-init-layout',
  templateUrl: './init-layout.component.html',
  styleUrls: ['./init-layout.component.css']
})
export class InitLayoutComponent implements OnInit, OnChanges {

  public isLoged = true;
  public isHome = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }
 ngOnChanges() {
   this.checkAuth();
 }
  ngOnInit() {
   const self = this;
    this.checkAuth();
    this.route.params.subscribe((params: any) => {
      self.checkAuth();
    });
    self.auth.onAuth.subscribe(value => {
      if (value) {
        this.checkAuth();
      }
    });
    if (this.router.url === '/') {
      self.isHome = true;
    } else {
      self.isHome = false;
    }

    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.url === '/') {
          self.isHome = true;
        } else {
          self.isHome = false;
        }
      }
    });
  }

  checkAuth() {
    if (this.auth.isAuth()) {
      this.isLoged = true;
    } else {
      this.isLoged = false;
    }
  }
}
