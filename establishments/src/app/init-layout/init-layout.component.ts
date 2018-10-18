import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-init-layout',
  templateUrl: './init-layout.component.html',
  styleUrls: ['./init-layout.component.css']
})
export class InitLayoutComponent implements OnInit {

  public isHome: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router:Router
  ) {  }

  ngOnInit() {
    let self = this;
    console.log();
    if (this.router.url == '/'){
      self.isHome = true;
    }else{
      self.isHome = false;
    }

    this.router.events.subscribe(res=>{
      if(res instanceof NavigationEnd){
        if(res.url == '/'){
          self.isHome = true;
        }else{
          self.isHome = false;
        }
      }
    });
  }

}
