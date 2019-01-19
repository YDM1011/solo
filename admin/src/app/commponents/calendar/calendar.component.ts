import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {Calendar} from "../../pages/work-time/work-time";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public id: string;
  @Input() calendar;
  public calendars = [];
  public keyArr = [
    "timeRange1",
    "timeRange2",
    "timeRange3",
    "timeRange4",
    "timeRange5",
    "timeRange6",
    "timeRange7",
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {}
  ngOnChanges() {}
  ngOnDestroy(){}
}
