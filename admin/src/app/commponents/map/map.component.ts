import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public marker:any;
  @Input() XY:any = [50.7464, 25.3262];
  @Output() onxy: EventEmitter<any> = new EventEmitter<any>();
  constructor() {

  }

  ngOnInit() {
    let s = this;
    const map = L.map('map').setView(s.XY, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, minZoom: 5,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click',(e) => {
      s.XY = [];
      s.XY.push(e.latlng.lat);
      s.XY.push(e.latlng.lng);
      console.log(s.marker);
      s.marker.setLatLng([s.XY[0], s.XY[1]]).update();
      s.onxy.emit(s.XY);
    });

    map.setMaxBounds([ [53.005339, 20.267085], [43.433007, 42.616687] ]);
    s.marker = L.marker(s.XY, {clickable: true,
      icon: new L.Icon({ iconUrl: './favicon.ico',
        iconSize: [30, 30],
        iconAnchor: [15, 15]  })
    }).addTo(map);
  }

}
