import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public form = {login: '', pass: ''};
  constructor(
      private router: Router,
      private auth: AuthService
  ) { }

  ngOnInit() {
  }
  send(){
    this.auth.signIn(this.form)
        .then((res: any) => {
          if (res){
            this.router.navigate([`user/${res._id}`]);
            console.log('res',res);
          }else{
            console.log('err',res);
          }
        }, (err:any)=>{
          console.log('err',err);
        });
  }
}
