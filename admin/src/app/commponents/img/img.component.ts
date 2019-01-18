import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges {

  @Input() img: any = {url: '', name: '', id: ''};
  @Input() pic: string;

  private id: any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    const s = this;
    s.initApi(s.img);
  }
  ngOnChanges(){
    const s = this;
    s.initApi(s.img);
  }
  initApi(mod) {
    const s = this;
    if (mod.id && !mod.url && !mod.name) {
      s.api.get('galery', mod.id, '').then((res: any) => {
        if (res) {
          s.pic = res.picCrop;
        }
      });
    } else if (!mod.id && mod.url && mod.name) {
      const query = '?populate=' + JSON.stringify({path: mod.name, select: '_id preload'}) + '&select=' + mod.name;
      s.api.get(mod.url, mod.name, '', query).then((val: any) => {
        if (val) {
          s.pic = val[mod.name].preload;
        }
      });
    }
  }
}
