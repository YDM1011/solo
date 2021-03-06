import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from "../../core.service";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Filters} from "./filters";
import * as moment from 'moment'
import {DeviceDetectorService} from "ngx-device-detector";

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
export class GeoComponent implements OnInit, OnDestroy {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  private geo = new Distance();
  public distans = [];
  public onLoad=false;
  public countEst:number;
  public isShow = false;
  public isDefPos= false;
  public isOpen= false;
  public isOpenM= false;
  public isAll= true;
  public cordinates = [];
  public meXY = [];
  public ests = [];
  public pos;
  public online = {
    isOnline:true,
    delivery:false,
    getself:false,
    reservation:false,
  };
  public dataNow;
  public tab: number = 0 ;
  public isMobile;
  private id;
  private options = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 30000
  };
  private target = {
    latitude : 0,
    longitude: 0
  };
  public filter:any = new Filters();
  public labels:any = [];
  @Input() avatar;
  constructor(
    private deviceService: DeviceDetectorService,
    private cookie:CookieService,
    protected api: CoreService
  ) { }

  ngOnInit() {
    if(this.avatar){
      if(this.avatar.search("/")>-1){
        let picCrop = this.avatar.split("/");
        this.avatar = picCrop[picCrop.length-1];
      }
    }
    this.isMobile = this.deviceService.isMobile();
    this.api.doGet('geoFilter').then(v=>{
      if(v){
        this.filter = v;
      }
    });
    this.api.doGet('label').then(v=>{
      if(v){
        this.labels = v;
      }
    })
  }
  ngOnDestroy() {
    document.querySelector('nav').style.zIndex = '';
    document.body.style.overflow = '';
  }

  findMe() {
    let s = this;
    s.isShow = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=> {
        this.pos = pos;
        s.alterGeo();
      }, (err)=>{s.error(err,s)}, s.options);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  close(){
    this.isShow = false;
    this.hidden()
  }

  error(err,s) {
    s.pos = {coords:{
        latitude:50.747490,
        longitude:25.326486,
      }};
    s.alterGeo();
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  sort(arr){
    // i.distans
    arr.sort(function (a, b) {
      return a.distans - b.distans;
    });
    return arr;
  }
  calc(arr,m){
    let c = 0;
    arr.map(i=>{
      if (i.ownerEst[m]) c++
    });
    return c
  }
  alterGeo(){
    let s =this;
    s.meXY.push(s.pos.coords.latitude);
    s.meXY.push(s.pos.coords.longitude);
    s.dataApi();
  }
  dataApi(q=''){
    let s =this;
    let x,y;
    x = s.pos.coords.latitude;
    y = s.pos.coords.longitude;
    s.api.doGet(`geo${q}`).then((val:any)=>{
        s.distans = [];
        s.cordinates = [];
        s.ests = val;
        s.checkOpen(s.isOpen)
    });
  }
  hidden() {
    document.querySelector('nav').style.zIndex = this.isShow ? '9' : '';
    document.querySelector('body').style.overflow = this.isShow ? 'hidden' : '';
  }
  setIcons(item){
    let s = this;
      item[item.ownerEst._id+'favorite'] = s.checkIconActive(item.ownerEst.favorite);
      item[item.ownerEst._id+'thebest'] = s.checkIconActive(item.ownerEst.thebest);
  }
  checkIconActive(arr){
    let s = this;
    let is = false;
    if (!arr) return;
    if (arr.length==0) return;
    arr.map(it=>{
      if(it == s.cookie.get('userid')){
        is = true;
      }
    });
    if (is) return true;
    else return false;
  }
  doAllFilters(){
    let s = this;
    s.isAll = !s.isAll;
    if(s.isAll){
      s.filter.map(item=>{
        if (item.check){
          item.check = false
        }
      });
      s.labels.map(item=>{
        if (item.check){
          item.check = false
        }
      });
      s.online = {
        isOnline:true,
        delivery:false,
        getself:false,
        reservation:false,
      };
    }
  }
  doFilter(){
    let s = this;
    let query = "?filter=";
    let ql="&label=";
    let online="&online=";
    let filterArr = [];
    let labelArr = [];
    s.filter.map(item=>{
      if (item.check){
        filterArr.push({categoriInUse:{$in:item.value}});
      }
    });
    s.labels.map(item=>{
      if (item.check){
        filterArr.push({labelInUse:{$in:item._id}});
      }
    });
    if(filterArr.length > 0){
      s.isAll = false;
    }else{
      s.isAll = true;
    }
    if(s.online.delivery || s.online.getself || s.online.reservation){
      online += JSON.stringify(s.online)
    }else { online = null }
    query += JSON.stringify(filterArr);
    s.dataApi(query + (online ? online:''));
    console.log(query)
  }
  getLogo(pic){
    let img;
    if (pic){
      if (pic.picCrop){
        let picCrop = pic.picCrop.split("/");
        pic.picCrop = encodeURI(picCrop[picCrop.length-1]);
        img = '/-px60-'+pic.picCrop
      }else{
        img = pic.picCrop
      }
    }else {
      img = '../../../assets/img/like_house.svg';
    }
    return img;
  }
  getBg(pic){
    let img;
    if (pic){
      if (pic.picCrop){
        let picCrop = pic.picCrop.split("/");
        pic.picCrop = encodeURI(picCrop[picCrop.length-1]);
        img = '/-px400-'+pic.picCrop
      }else{
        img = pic.picCrop
      }
    }else {
      img = '';
    }
    return img;
  }
  checkOpen(st){
    let s = this;
    this.isOpen = st;
    this.isOpenM = st;
    s.countEst = 0;
    let numberDay = moment().day() == 0 ? 7 : moment().day();
    this.dataNow = {
      min: moment().hours()*60+moment().minutes(),
      label: 'timeRange'+numberDay
    };
    let x,y;
    x = s.pos.coords.latitude;
    y = s.pos.coords.longitude;
    s.distans = [];
    s.cordinates = [];
    s.ests.map(item=>{
      item = item;
      s.setIcons(item);
      if(item.coordinates && item.ownerEst && item.worksTimeId){
        if ( item.coordinates[0] && item.coordinates[1]){
          if (s.isOpen){
            if (item.worksTimeId){
              if (item.worksTimeId[s.dataNow.label]){
                let timeE,timeS;
                if(item.worksTimeId[s.dataNow.label].isAllTime){
                    let av =  s.getLogo(item.av);
                    s.cordinates.push(
                      {
                        x: item.coordinates[0],
                        y: item.coordinates[1],
                        logo: s.getLogo(item.ownerEst.av),
                        bg: s.getBg(item.ownerEst.bg),
                        address: item.address,
                        name: item.name,
                        link: '//'+item.ownerEst.subdomain+'.'+s.host,
                        active: item.ownerEst.verify
                      });
                    item['distans'] = s.geo.calc(
                      {lat: item.coordinates[0], lng: item.coordinates[1]},
                      {lat: x, lng: y}
                    );
                    s.distans.push(item);
                } else
                if(item.worksTimeId[s.dataNow.label].isWeekend){

                } else {
                  let He = parseInt(item.worksTimeId[s.dataNow.label].timeEnd.split(":")[0]);
                  let Me = parseInt(item.worksTimeId[s.dataNow.label].timeEnd.split(":")[1]);
                  let Hs = parseInt(item.worksTimeId[s.dataNow.label].timeStart.split(":")[0]);
                  let Ms = parseInt(item.worksTimeId[s.dataNow.label].timeStart.split(":")[1]);
                  timeE = He*60+Me;
                  timeS = Hs*60+Ms;
                  if(timeE<timeS){timeE += 24*60}
                  if(parseInt(s.dataNow.min) < timeE && parseInt(s.dataNow.min) >= timeS){
                    let av = item.av ? item.av.picCrop : "../../../assets/img/like_house.svg";
                    s.cordinates.push(
                      {
                        x: item.coordinates[0],
                        y: item.coordinates[1],
                        logo: s.getLogo(item.ownerEst.av),
                        bg: s.getBg(item.ownerEst.bg),
                        address: item.address,
                        name: item.name,
                        link: '//'+item.ownerEst.subdomain+'.'+s.host,
                        active: item.ownerEst.verify
                      });
                    item['distans'] = s.geo.calc(
                      {lat: item.coordinates[0], lng: item.coordinates[1]},
                      {lat: x, lng: y}
                    );
                    s.distans.push(item);
                    if(item.ownerEst.verify){
                      s.countEst++
                    }
                  }
                }
              }
            }
          }else{
            let av = s.getLogo(item.av);
            s.cordinates.push(
              {
                x: item.coordinates[0],
                y: item.coordinates[1],
                logo: s.getLogo(item.ownerEst.av),
                bg: s.getBg(item.ownerEst.bg),
                address: item.address,
                name: item.name,
                link: '//'+item.ownerEst.subdomain+'.'+s.host,
                active: item.ownerEst.verify
              });
            item['distans'] = s.geo.calc(
              {lat: item.coordinates[0], lng: item.coordinates[1]},
              {lat: x, lng: y}
            );
            s.distans.push(item);
            if(item.ownerEst.verify){
              s.countEst++
            }

          }

        }
      }
    });
    if (s.distans.length>0){
      s.distans = s.sort(s.distans);
    }
    console.log(s.cordinates);
    s.onLoad = true;
  }

}
