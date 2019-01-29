import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {FormApiService} from "../form-api/form-api.service";
import swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-create-establishment',
  templateUrl: './create-establishment.component.html',
  styleUrls: ['./create-establishment.component.css'],
  animations: [
    trigger('inOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('140ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('inPop', [
      transition(':enter', [
        style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }),
        animate('220ms', style({
          transform: 'scaleX(1) scaleY(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('120ms', style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class CreateEstablishmentComponent implements OnInit {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public showPop:boolean = false;
  public establishment:any = {};
  public myEst: any = [];
  public id;
  constructor(
    private route: ActivatedRoute,
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    // establishment
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params:any) => {
      this.id = params.id;
      self.getEstablishment(params.id)
    });
  }
  getEstablishment(id){
    let self = this;
    let query = JSON.stringify({owner:id});
    let select = "subdomain,_id,name";
    self.http.get(`${self.domain}/api/establishment?query=${query}&select=${select}`, self.api.getHeaders())
      .subscribe((res: any) => {
        console.log(res);
        self.myEst = res;
      });
  }
  establishmentData(){
    let self = this;
    self.http.post(self.domain+'/api/create_establishment', self.establishment, self.api.getHeaders())
      .subscribe((res: any) => {
        console.log(res);
        self.myEst = res;
      },(err:any)=>{
        if (err.error.error) {
          return swal("Error", err.error.error, "error");
        }
      });
  }
  hidden(){
    window.scroll(0, 0);
    document.querySelector('body').style.overflow = this.showPop ? 'hidden' : '';
    document.querySelector('nav').style.zIndex = this.showPop ? '1' : '10';
  }
}
