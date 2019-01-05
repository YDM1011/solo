import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.css']
})
export class FriendPageComponent implements OnInit, OnChanges {

  public domain: string = environment.apiDomain;

  public isFriends = false;
  public friends:any;
  public id:any;
  public obj:any;
  public populate:any = JSON.stringify({path:'photo', select:'preload _id'});
  public mutual:any = [];
  public people:any = [];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }
  ngOnChanges() {}
  ngOnInit() {
    const s = this;
    s.id = location.href.split("user/")[1].split("/")[0];
    s.obj = JSON.stringify({id: s.id});

    s.route.params.subscribe((params: any) => {
      s.id = location.href.split("user/")[1].split("/")[0];
      s.obj = JSON.stringify({id: s.id});
      s.apiInitial(s.id);
    });
  }

  apiInitial(idc) {
    const s = this;
    this.http.get(this.domain + '/api/getFriends?userId=' + idc, s.api.getHeaders())
      .subscribe((friends: any) => {
        s.friends = (friends);
        s.isFriends = true;
        // friends.myFriends.forEach((friend)=>{
        //   this.http.get(this.domain+'/api/getMutual/'+friend._id, this.api.getHeaders())
        //     .subscribe((res: any) => {
        //       this.mutual[friend._id] = res.mutual;
        //     });
        // })
      });
  }

  setMutual(res) {
    this.mutual[res.id] = res.mutual;
  }
  more(res) {
    this.people = res;
  }
}
