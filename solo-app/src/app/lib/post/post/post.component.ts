import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../../../core.service';
import {environment} from '../../../../environments/environment';
import {PostService} from '../post.service';
import {count} from 'rxjs/internal/operators';
import {AuthService} from '../../../auth.service';
import {FormApiService} from '../../form-api/form-api.service';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public count = 0;
  public maxcount = 0;
  public limit = 4;
  public user;
  public obj;
  public next = false;
  public isShow = true;
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public protocol: string = environment.apiDomain.split('//')[0];
  @Input() id: string;
  @Input() posts;
  constructor(
    private core: CoreService,
    private auth: AuthService,
    private http:  HttpClient,
    private post: PostService,
    private api: FormApiService
  ) { }

  ngOnInit() {
    this.obj = JSON.stringify({id: this.id});
    const self = this;
    self.auth.onUserData.subscribe(value => {
      if (value) {
        this.user = value[0];
      }
    });

  }
  addShare(obj) {
    // /api/share
    const self = this;
    this.http.post(this.domain + '/api/share', obj, this.api.getHeaders())
      .subscribe((post: any) => {
      if (post.userId._id == self.auth.getUserId()) {
        console.log(post);
        // post.share.userIdShare = self.auth.getUserData().avatar;
        self.posts.unshift(post);
      }
      });
  }
}
