import {Component, EventEmitter, OnInit} from '@angular/core';
declare var Materialize: any;

class MaterializeAction {
}

@Component({
  selector: 'app-to-order',
  templateUrl: './to-order.component.html',
  styleUrls: ['./to-order.component.css']
})
export class ToOrderComponent implements OnInit {

  public isShow:boolean=false;
  public maxDate = new Date();
  public data;
  public birthDateActions = new EventEmitter<string|MaterializeAction>();
  public dateOfBirth = new Date();
  public time = `${new Date().getHours()}:${new Date().getMinutes()+30}`;
  public options: Pickadate.DateOptions = {
    clear: 'Очистити',
    close: 'Обрати',
    today: 'Сьогодні',
    closeOnClear: true,
    onStart: (event)=>{ console.log(this) },
    closeOnSelect: false,
    format: 'dd.mm.yyyy',
    formatSubmit: 'yyyy-mm-dd',
    hiddenName: true,
    onSet: (context) => {
      if ( context.select != null) this.data = this.dataToObject2( new Date(context.select)); // select data!!!
      //console.log(this.data)
    },
    selectMonths: true,
    selectYears: 10,
    firstDay: true,
    min: new Date(),
    max: new Date( this.maxDate.getFullYear()+1, this.maxDate.getMonth(), this.maxDate.getDate()),
    monthsFull: [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень'
    ],
    monthsShort: [
      'Січня',
      'Лютого',
      'Березня',
      'Квітня',
      'Травня',
      'Червня',
      'Липня',
      'Серпня',
      'Вересня',
      'Жовтня',
      'Листопада',
      'Грудня'
    ],
    weekdaysFull: [
      'Нд',
      'Пн',
      'Вт',
      'Ср',
      'Чт',
      'Пт',
      'Сб'
    ],
    weekdaysShort:[
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'П\'ятниця',
      'Субота'
    ],
    showMonthsShort: undefined,
    showWeekdaysFull: true,
  };

  public timeOptions: Pickadate.TimeOptions = {
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'Обрати',
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Повернутися',
    autoclose: true,
    ampmclickable: true, // make AM PM clickable
    aftershow: () => console.log('AfterShow has been invoked.'), // function for after opening timepicker
  };

  constructor() { }

  ngOnInit() {
  }

  dataToObject2(data){
    return {
      year: data.getFullYear(),
      month: data.getMonth()+1,
      day: data.getDate()
    }
  }
  openDatePicker() {
    //actions are open or close
    this.birthDateActions.emit({action: "pickadate", params: ["open"]});
  }
}
