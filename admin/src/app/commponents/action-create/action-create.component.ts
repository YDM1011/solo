import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {CookieService} from "ngx-cookie-service";
import {Post} from "./post";
import {PostService} from "./post.service";

@Component({
  selector: 'app-action-create',
  templateUrl: './action-create.component.html',
  styleUrls: ['./action-create.component.css']
})
export class ActionCreateComponent implements OnInit {
  // public id: string;
  // public action = {about:'',picC:''};

  @Output() onCreate = new EventEmitter();
  @Input() firstName: string = '';
  @Input() avatar: any;
  @Input() id: string;
  @Input() place: any;
  public btn = '<span class="btn btn-primary">Додати фото</span>';
  public postObg = new Post();
  public inPlace = {place: '', id: '', value: ''};
  public impressions = [
    {name: 'Без вражень', val:''},
    {name: 'Чудово', val: 'чудово'},
    {name: 'Задоволено', val: 'задоволено'},
    {name: 'Розчаровано', val: 'розчаровано'},
    {name: 'Обурено', val: 'обурено'},
    {name: 'Жахливо', val: 'жахливо'},
  ];
  public user;
  public places = [];
  public friends = [];
  public active: string;
  public placeActive: string;
  public friendActive: string;
  public search: string;
  public editImg: any = null;
  constructor(
    private post: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private cooki: CookieService
  ) { }


  ngOnInit() {
    let s = this;
    //noinspection TypeScriptValidateTypes
    this.postObg.userId = this.cooki.get('userid');

    this.post.getEst().then((val: any) => {
      if (val) {
        s.places = [];
        s.places = val;
      }
    });
    this.post.getFriend().then((val: any) => {
      if (val) {
        s.friends = [];
        s.friends = val;
      }
    });
    if(s.place){
      console.log(s.place);
      s.takePlace(s.place)
    }
  }

  addPost(post) {
    const self = this;
    self.post.pushPost(post);
    self.postObg = new Post();
    //noinspection TypeScriptValidateTypes
    this.postObg.userId = this.cooki.get('userid');
    this.friendActive = '';
    this.placeActive = '';
    this.active = '';
    this.onCreate.emit(true);
  }
  take(imression) {
    this.postObg.imression.name = imression.val;
    this.active = imression.val;
  }
  takePlace(place) {
    this.inPlace.place = place.subdomain;
    this.inPlace.id = place._id;
    this.inPlace.value = place.av ? place.av.picCrop : null;
    this.postObg.inPlace = this.inPlace;
    this.placeActive = place.name;
  }
  clearPlace(){
    this.inPlace.place = '';
    this.inPlace.id = null;
    this.inPlace.value = null;
    this.postObg.inPlace = '';
    this.placeActive = '';
  }
  takeFriend(item) {
    item.id = item._id;
    this.postObg.withFriend.push(item);
    this.friendActive = item.name;
  }
  delet(i) {
    //noinspection TypeScriptValidateTypes
    this.postObg.withFriend.splice(i, 1) ;
  }
  removeImg(i){
    this.postObg.img.splice(i, 1);
  }
  rotate(i: number, transform: number){
    this.editImg = {
      def: this.postObg.img[i].base64crop,
      name: this.postObg.img[i].fileName,
      index: i,
      transform: transform
    };
  }
  newEditImg(obj) {
    let index = obj.index;
    delete obj.index;
    this.postObg.img[index] = obj;
  }
  savePost(){
    let s = this;
    s.postObg['estId'] = this.route.snapshot.paramMap.get('id');;
    s.post.savePost(s.postObg).then((val:any)=>{
      if(val){
        s.addPost(val)
      }
    })
  }
}
