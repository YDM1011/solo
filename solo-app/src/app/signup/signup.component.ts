import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form = {
    login: '',
    firstName: '',
    lastName: '',
    pass: ''
  };
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
  send(){
    this.auth.signUp(this.form)
      .then((res: any) => {
        if (res){
          this.router.navigate(['signin']);
          console.log('res',res)
        }
      },err=>{});
  }
}
