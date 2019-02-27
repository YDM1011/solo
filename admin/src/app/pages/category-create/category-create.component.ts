import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  public category = {
    name: '',
    maincategory: {},
    globcategory: ''
  };
  private key = 'category';

  public id: any;
  public option: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    const self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.route.params.subscribe((params: any) => {
      self.id = params.id;
      self.initApi(self.id);
    });
  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/category/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }
  initApi(id) {
    const self = this;
    const req1 = ['option'];
    req1.forEach((select) => {
      this.api.get('maincategory').then((res: any) => {
        if (res) {
          self.option = [];
          res.map((item: any) => {
            self.option.push({
              name: item.maincategory,
              label: item.name,
              id: item._id
            });
          });
          self[select] = self.option;
        }
      }).catch((err: any) => {});
    });
  }
  create(obj) {
    const self = this;
    obj['estId'] = self.id;
    this.api.create('category', obj, self.id).then((res: any) => {
      if (res) {
        self.api.createDate('category', res, self.id).then((val: any) => {
          this.router.navigate(['/category/' + self.id]);
        });
      }
    }).catch((err: any) => {});
  }
  delingredient(index) {
    const self = this;
    self[self.key].maincategory = {};
  }
  selected(obj) {
    const s = this;
    s[s.key].maincategory = obj.id;
  }
}
