import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-order-detail-edit',
  templateUrl: './order-detail-edit.component.html',
  styleUrls: ['./order-detail-edit.component.css']
})
export class OrderDetailEditComponent implements OnInit {

  public estId;
  public id;
  public product = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    this.estId = this.route.snapshot.paramMap.get('eid');
    this.id = this.route.snapshot.paramMap.get('id');
  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/order/'+this.estId+'/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }

}
