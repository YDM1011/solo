import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public form = {login: '', pass: ''};
  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) { }
  ngOnInit() {
  }
  send(){
    let s = this;
    this.auth.signIn(this.form)
      .then((res: any) => {
        if (res){
          // s.location.go(res._id);
          this.router.navigate([`/`]);
          console.log('res',res);
        }else{
          console.log('err',res);
        }
      }, (err:any)=>{
        console.log('err',err);
      });
  }

}
