import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
@Component({
  selector: 'app-marker-cluster-demo',
  templateUrl: './marker-cluster-demo.component.html',
  styleUrls: ['./marker-cluster-demo.component.css']
})
export class MarkerClusterDemoComponent implements OnInit, OnChanges {
  @Input() XY:any = [];
  @Input() me:any = [];
  @Input() meAvatar;
// Open Street Map Definition
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      minZoom: 7,
      attribution: 'Open Street Map'
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions = { position: 'bottomright' };
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer
  };
  options = {
    zoom: 17
  };
  // map.setMaxBounds([ [53.005339, 20.267085], [43.433007, 42.616687] ]);
  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: any[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;

  // Generators for lat/lon values
  generateLat(i) { return this.XY[i].y }
  generateLon(i) { return this.XY[i].x }


  ngOnInit() {
    if(this.XY.length>0 && this.me){
      this.options['center'] =  L.latLng([this.me[0], this.me[1]]);
      this.generateData();
    }

  }

  ngOnChanges(){
    if(this.XY.length>0)
      this.generateData();
  }

  markerClusterReady(group: L.MarkerClusterGroup) {

    this.markerClusterGroup = group;

  }

  generateData() {

    let s = this;
    const data: any[] = [];
    const LeafIcon = L.Icon.extend({options:{
        iconSize: [30, 30],
        iconAnchor: [30, 30],
        popupAnchor:  [-15, -15],
        iconUrl: ''
      }});
    let i = 0;
    for (i; i < this.XY.length; i++) {
      let xyc = s.XY[i];

      if(xyc.x && xyc.y){
        if(xyc.active ){
          let icon = new LeafIcon();
          icon.options.iconUrl ='./favicon.ico';

          data.push(L.marker([ this.generateLon(i), this.generateLat(i) ], { icon }).bindPopup(`
            <div class="map-pop"><div class="img-of-map"><img src="${xyc.bg}" class="bg"><img src="${xyc.logo}" class="logo"></div><strong>${xyc.name}</strong><br/><span>${xyc.address?xyc.address:''}</span><br/><a href="${xyc.link}">Сайт закладу</a></div>
          `));
        }else{
          let icon = new LeafIcon();
          icon.options.iconUrl ='../../../assets/img/logo_mini_grey.png';

          data.push(L.marker([ this.generateLon(i), this.generateLat(i) ], { icon }).bindPopup(`
            <div class="map-pop"><strong>${xyc.name}</strong><br/><span>${xyc.address?xyc.address:''}</span></div>`));
        }
      }
    }

    let userIcon = new LeafIcon();
    userIcon.options.iconUrl = s.meAvatar;
    // @ts-ignore
    data.push(L.marker([s.me[0],s.me[1]], {clickable: true, userIcon }));

    this.markerClusterData = data;

  }
}
