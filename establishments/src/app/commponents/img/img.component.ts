import { Component, OnInit, Input  } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  @Input() img: any = {model: '', field: '', id: ''};
  @Input() pic: string;

  private id: any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    const s = this;
    s.initApi(s.img);
  }
  initApi(mod) {
    const s = this;
    if (mod.id && !mod.model && !mod.field) {
      s.api.get('galery', mod.id, '').then((res: any) => {
        if (res) {
          s.pic = res.picCrop;
        }
      });
    } else if (!mod.id && mod.model && mod.field) {
      const query = '?query=' + JSON.stringify({model: mod.model, field: mod.field});
      s.api.get('galery', '', '', query).then((val: any) => {
        if (val) {
          console.log(val);

          s.pic = val[0].picCrop;
        }
      });
    }
  }
}
