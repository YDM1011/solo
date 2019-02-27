import { Component, OnInit, Input } from '@angular/core';
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public marker:any;
  @Input() XY:any;
  @Input() index:any;
  constructor() {

  }

  ngOnInit() {
    let s = this;
    setTimeout(()=>{
      const map = L.map(s.index).setView(s.XY, 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, minZoom: 5,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      map.setMaxBounds([ [53.005339, 20.267085], [43.433007, 42.616687] ]);
      s.marker = L.marker(s.XY, {clickable: true,
        icon: new L.Icon({ iconUrl: './favicon.ico',
          iconSize: [30, 30],
          iconAnchor: [15, 15]  })
      }).addTo(map);
    },0);

  }

}
