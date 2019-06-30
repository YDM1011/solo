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

  average: number
  pending = true
  public id;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngAfterViewInit() {
    const gainConfig: any ={
      label: 'Виручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any ={
      label: 'Замовлення',
      color: 'rgb(54, 162, 235)'
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.api.get('analytics', this.id).then((v: any) => {
      this.average = v.average;

      gainConfig.labels = v.chart.map(item => item.label);
      gainConfig.data = v.chart.map(item => item.gain);

      orderConfig.labels = v.chart.map(item => item.label);
      orderConfig.data = v.chart.map(item => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';


      new Chart(gainCtx, createChartConfig(gainConfig));
      new Chart(orderCtx, createChartConfig(orderConfig));

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
