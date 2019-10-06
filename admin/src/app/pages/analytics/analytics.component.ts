import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef  
  @ViewChild('cat') catRef: ElementRef

  average: number;
  average_day: number;
  total: number;
  kilk: number;
  box: number;
  del: number;
  gainChart;
  orderChart;
  catChart;
  pending = true
  public id;
  public month;
  public month_name;
  public months = [{name:"Січень", num:"0"},
    {name:"Лютий", num:"1"},
    {name:"Березень", num:"2"},
    {name:"Квітень", num:"3"},
    {name:"Травень", num:"4"},
    {name:"Червень", num:"5"},
    {name:"Липень", num:"6"},
    {name:"Серпень", num:"7"},
    {name:"Вересень", num:"8"},
    {name:"Жовтень", num:"9"},
    {name:"Листопад", num:"10"},
    {name:"Грудень", num:"11"}];
  //public months = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngAfterViewInit() {
    this.month = new Date().getMonth();
    this.months.map(label => {
      if (label.num == this.month) this.month_name = label.name;
    });    
    const gainConfig: any ={
      label: 'Виручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any ={
      label: 'Замовлення',
      color: 'rgb(54, 162, 235)'
    }

    const catConfig: any ={
      label: 'Категорії товарів'
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.api.get('analytics', this.id, this.month).then((v: any) => {
      this.average = v.average;
      this.average_day = v.average_day;
      this.total = v.total;
      this.kilk = v.kilk;
      this.box = v.box;
      this.del = v.del;

      gainConfig.labels = v.chart.map(item => item.label);
      gainConfig.data = v.chart.map(item => item.gain);

      orderConfig.labels = v.chart.map(item => item.label);
      orderConfig.data = v.chart.map(item => item.order);

      catConfig.labels = v.cat.map(item => item.label);
      catConfig.data = v.cat.map(item => item.sum);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      const catCtx = this.catRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';
      catCtx.canvas.height = '300px';


      this.gainChart = new Chart(gainCtx, createChartConfig(gainConfig));
      this.orderChart = new Chart(orderCtx, createChartConfig(orderConfig));
      this.catChart = new Chart(catCtx, createChartCatConfig(catConfig));

      this.pending = false;
    });

  }

  getAnalytics() {
    this.catChart.destroy();
    this.gainChart.destroy();
    this.orderChart.destroy();
    this.months.map(label => {
      if (label.num == this.month) this.month_name = label.name;
    });
    //var month = new Date().setMonth(this.month);
    const gainConfig: any ={
      label: 'Виручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any ={
      label: 'Замовлення',
      color: 'rgb(54, 162, 235)'
    }

    const catConfig: any ={
      label: 'Категорії товарів'
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.api.get('analytics', this.id, this.month).then((v: any) => {
      this.average = v.average;
      this.average_day = v.average_day;
      this.total = v.total;
      this.kilk = v.kilk;
      this.box = v.box;
      this.del = v.del;

      gainConfig.labels = v.chart.map(item => item.label);
      gainConfig.data = v.chart.map(item => item.gain);

      orderConfig.labels = v.chart.map(item => item.label);
      orderConfig.data = v.chart.map(item => item.order);

      catConfig.labels = v.cat.map(item => item.label);
      catConfig.data = v.cat.map(item => item.sum);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      const catCtx = this.catRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';
      catCtx.canvas.height = '300px';


      this.gainChart = new Chart(gainCtx, createChartConfig(gainConfig));
      this.orderChart = new Chart(orderCtx, createChartConfig(orderConfig));
      this.catChart = new Chart(catCtx, createChartCatConfig(catConfig));

      this.pending = false;
    });
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false,
          min: 0
        }
      ]
    }
  }
}

function createChartCatConfig({labels, data, label, color}) {
  return {
    type: 'horizontalBar',
    options: {
      scales: {
          xAxes: [{
              stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
      }
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          backgroundColor: ['red','green','blue','yellow','brown','violet'],
          steppedLine: false,
          fill: false,
        }
      ]
    }
  }
}
