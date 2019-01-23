import {Component, Input, OnInit} from '@angular/core';
import {CoreService} from "../../core.service";
import {environment} from "../../../environments/environment";

class Distance {
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  calc(from, to) {
    const lat1 = parseFloat(from.lat);
    const lon1 = parseFloat(from.lng);
    const lat2 = parseFloat(to.lat);
    const lon2 = parseFloat(to.lng);
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

// export default new Distance();

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  private geo = new Distance();
  public distans = [];
  public onLoad=false;
  public isShow = false;
  public cordinates = [];
  public meXY = [];
  @Input() avatar;
  constructor(
    protected api: CoreService
  ) { }

  ngOnInit() {
  }

  findMe() {
    let x,y;
    let s = this;
    s.isShow = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        navigator.geolocation.watchPosition((position) => {
          x = position.coords.latitude;
          y = position.coords.longitude;
          s.meXY.push(position.coords.latitude);
          s.meXY.push(position.coords.longitude);
          s.api.doGet(`geo`).then((val:any)=>{
            s.distans = [];
            s.cordinates = [];
            val.map(item=>{
              if(item.coordinates){
                if ( item.coordinates[0] && item.coordinates[1]){
                  let av = item.av ? item.av.picCrop : "../../../assets/img/like_house.svg";
                  s.cordinates.push({x:  item.coordinates[0],y: item.coordinates[1], av:av});
                  item['distans'] = s.geo.calc(
                    {lat: item.coordinates[0], lng: item.coordinates[1]},
                    {lat: x, lng: y}
                  );
                  s.distans.push(item);
                }
              }
            });
            s.onLoad = true;
            console.log(s.distans);
          })
        });
      },(err)=>{}, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  close(){
    this.isShow = false;
  }
}
