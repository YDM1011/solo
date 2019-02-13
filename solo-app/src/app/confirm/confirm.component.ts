import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() form;
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
  send(){
    this.auth.signConfirm(this.form)
      .then((res: any) => {
        if (res){
          this.auth.signIn(this.form)
            .then((res: any) => {
              if (res){
                this.router.navigate([`user/${res._id}`]);
              }else{
              }
            }, (err:any)=>{
              console.log('err',err)
            });
        }
      },err=>{});
  }
}
