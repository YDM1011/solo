import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {Calendar} from "../work-time/work-time";

@Component({
  selector: 'app-work-time-create',
  templateUrl: './work-time-create.component.html',
  styleUrls: ['./work-time-create.component.css']
})
export class WorkTimeCreateComponent implements OnInit {

  public id: string;
  public calendar = new Calendar();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

  }

}
