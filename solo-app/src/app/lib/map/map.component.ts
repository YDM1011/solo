import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() XY:any = [];
  @Input() me:any = [];
  @Input() meAvatar;
  constructor() {

  }
  ngOnInit() {
   if( this.XY.length>0 && this.me.length>0 ) this.initMap()
  }
  // ngOnChanges() {
  //  if( this.XY.length>0 && this.me.length>0 ) this.initMap()
  // }
  initMap(){
    let s = this;
    setTimeout(()=>{
    let map = L.map('mapUser').setView(s.me, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, minZoom: 5,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    map.setMaxBounds([ [53.005339, 20.267085], [43.433007, 42.616687] ]);
    s.XY.map(xyc=>{
      let oxy = [];
      console.log(xyc);
      oxy[0] = xyc.x;
      oxy[1] = xyc.y;
      L.marker(oxy, {clickable: true,
        icon: new L.Icon({ iconUrl: './favicon.ico',
          iconSize: [30, 30],
          iconAnchor: [15, 15]  })
      }).addTo(map);
    });

    L.marker(s.me, {clickable: true,
      icon: new L.Icon({ iconUrl: s.meAvatar,
        iconSize: [30, 30],
        iconRadius: 50,
        iconAnchor: [15, 15]  })
    }).addTo(map);
    },0);
  }

}
