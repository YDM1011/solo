import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  domain: string = environment.apiDomain;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.http.get(this.domain+'/api/post')
      .subscribe((user: any) => {console.log(user)});
  }

}
