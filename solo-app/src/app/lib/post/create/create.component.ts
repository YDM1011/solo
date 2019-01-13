import {Component, OnInit, Input} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() firstName: string = '';
  @Input() avatar: any;
  @Input() id: string;
  public btn = '<span class="post-up_button"><span class="post-up_svg"></span><span class="post-up_title">Додати фото</span></span>';
  public postObg = new Post();
  public inPlace = {place: '', id: '', value: ''};
  public impressions = [
    {name: 'чудово'},
    {name: 'задоволено'},
    {name: 'розчаровано'},
    {name: 'обурено'},
    {name: 'жахливо'},
  ];
  public places = [];
  public friends = [];
  public active: string;
  public placeActive: string;
  public friendActive: string;
  public search: string;
  constructor(
    private post: PostService,
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
  }
  take(imression) {
    this.postObg.imression.name = imression.name;
    this.active = imression.name;
  }
  takePlace(place) {
    this.inPlace.place = place.subdomain;
    this.inPlace.id = place._id;
    this.inPlace.value = place.av.preload;
    this.postObg.inPlace = place._id;
    this.placeActive = place.name;
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
}
