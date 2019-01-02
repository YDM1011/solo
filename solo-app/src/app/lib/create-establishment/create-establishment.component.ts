import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {FormApiService} from "../form-api/form-api.service";
import swal from "sweetalert2";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-establishment',
  templateUrl: './create-establishment.component.html',
  styleUrls: ['./create-establishment.component.css']
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
}
