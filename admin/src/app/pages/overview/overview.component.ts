import { Component, OnInit } from '@angular/core';
import { OverviewPage } from 'src/app/service/interface';
import { Observable } from 'rxjs';
import { AnalyticsService } from 'src/app/service/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public data$: any
  
  public id;

  yesterday = new Date();
  date = new Date();
  public orders = [];

  constructor(
    private service: AnalyticsService,
    private route: ActivatedRoute,
    private api: ApiService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //this.data$ = this.service.getOverview(this.id);

    this.data$ = this.api.get('overview', this.id);
    

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }


}
