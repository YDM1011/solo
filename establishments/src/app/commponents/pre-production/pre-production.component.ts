import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

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
  @Output() statusResult: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {}

  ngOnChanges(){
    if (this.status) this.hidden();
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
