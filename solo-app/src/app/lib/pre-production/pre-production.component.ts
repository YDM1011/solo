import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-pre-production',
  templateUrl: './pre-production.component.html',
  styleUrls: ['./pre-production.component.css'],
  animations: [
    trigger('inOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('140ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('120ms', style({ opacity: 0 }))
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

export class PreProductionComponent implements OnInit, OnDestroy {
  @Input() status: boolean = false;
  @Input() scroll: boolean = false;
  @Input() entity;
  @Input() data;
  @Output() statusResult: EventEmitter<any> = new EventEmitter<any>();
  public host: string = environment.apiDomain.split('//')[1];
  ngOnInit() {

  }

  ngOnChanges(){
    if (this.status) this.hidden();
    if (this.data){
      if(this.data.length==1 && !this.data[0].mess && this.entity=='basket'){
        // @ts-ignore
        window.location = `//${this.data[0].subdomain+'.'+this.host}/basket`
      }
    }
  }
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
  close() {
    this.status = !this.status;
    this.statusResult.emit(this.status);
    document.querySelector('body').style.overflow = '';
    if (this.scroll){
      document.querySelector('nav').style.zIndex = '10';
    }
  }
  hidden() {
    if(this.scroll){
      document.querySelector('nav').style.zIndex = '1';
      window.scroll(0, 0);
    }
    document.querySelector('body').style.overflow = 'hidden';
  }
}
