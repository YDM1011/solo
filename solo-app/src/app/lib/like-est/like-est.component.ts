import {Component, Input, OnInit} from '@angular/core';
import {FormApiService} from "../form-api/form-api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-like-est',
  templateUrl: './like-est.component.html',
  styleUrls: ['./like-est.component.css']
})
export class LikeEstComponent implements OnInit {
  public host: string = environment.apiDomain.split('//')[1];
  public domain: string = environment.apiDomain;
  @Input() id;
  public ests;
  constructor(
    private route: ActivatedRoute,
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    let s = this;
    if(s.id)
    s.initApi();
  }
  ngOnChanges(){
    let s = this;
    if(s.id)
    s.initApi()
  }
  initApi(){
    let s = this;
    s.http.get(s.domain + '/api/getLikeEsts/' + s.id, s.api.getHeaders())
      .subscribe((ests: any) => {
        s.ests = (ests);
      });
  }
}
