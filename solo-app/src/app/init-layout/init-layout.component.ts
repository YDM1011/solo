import {Component, OnInit, OnChanges} from '@angular/core';
import { AuthService } from "../auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-init-layout',
  templateUrl: './init-layout.component.html',
  styleUrls: ['./init-layout.component.css']
})
export class InitLayoutComponent implements OnInit, OnChanges {

  public isLoged: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }
 ngOnChanges(){
   this.checkAuth();
 }
  ngOnInit() {
   let self = this;
    this.checkAuth();
    this.route.params.subscribe((params:any) => {
      self.checkAuth();
    });
    self.auth.onAuth.subscribe(value=>{
      if(value){
        this.checkAuth();
      }
    });
  }

  checkAuth(){
    if (this.auth.isAuth()){
      this.isLoged = true;
    }else{
      this.isLoged = false;
    }
  }
}
