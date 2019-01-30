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

  private id;
  private options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };
  private target = {
    latitude : 0,
    longitude: 0
  };

  @Input() avatar;
  constructor(
    protected api: CoreService
  ) { }

  ngOnInit() {
  }

  findMe() {

    let s = this;
    s.isShow = true;
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition((position) => {
        s.id = navigator.geolocation.watchPosition((pos)=> {
          let crd = pos.coords;
          let x,y;
          x = pos.coords.latitude;
          y = pos.coords.longitude;
          s.meXY.push(pos.coords.latitude);
          s.meXY.push(pos.coords.longitude);
          console.log(pos.coords);
          s.api.doGet(`geo`).then((val:any)=>{
            s.distans = [];
            s.cordinates = [];
            val.map(item=>{
              if(item.coordinates && item.ownerEst){
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
            navigator.geolocation.clearWatch(s.id);
            console.log(s.distans);
          });

          if (s.target.latitude === x && s.target.longitude === y) {
            console.log('Congratulations, you reached the target');
            navigator.geolocation.clearWatch(s.id);
          }
        }, s.error, s.options);
      // });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  close(){
    this.isShow = false;
    this.hidden()
  }

  error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  hidden() {
    document.querySelector('body').style.overflow = this.isShow ? 'hidden' : '';
  }
  tab: boolean = true;
}
