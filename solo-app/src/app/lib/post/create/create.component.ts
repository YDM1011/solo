import {Component, OnInit, Input} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../post";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() firstName: string = '';
  @Input() avatar: string = '';
  @Input() id: string;
  public btn = '<span class="post-up_button"><span class="post-up_svg"></span><span class="post-up_title">Додати фото</span></span>';
  public postObg = new Post();
  public impressions = [
    {name: 'чудово'},
    {name: 'задоволено'},
    {name: 'розчаровано'},
    {name: 'обурено'},
    {name: 'жахливо'},
  ];
  public places = [
    {name: 'Solo'},
    {name: 'Ring'},
    {name: 'Bazelic'}
  ];
  public friends = [
    {name: 'Den'},
    {name: 'Misha'},
    {name: 'Andry'}
  ];
  public active: string;
  public placeActive: string;
  public friendActive: string;
  public search: string;
  constructor(
    private post: PostService
  ) { }

  ngOnInit() {
    //noinspection TypeScriptValidateTypes
    this.postObg.userId = this.id;
  }

  addPost(post){
    let self = this;
    self.post.pushPost(post);
    self.postObg = new Post();
    //noinspection TypeScriptValidateTypes
    this.postObg.userId = self.id;
    this.friendActive = '';
    this.placeActive = '';
    this.active = '';
  }
  take(imression){
    this.postObg.imression.name = imression.name;
    this.active = imression.name;
  }
  takePlace(place){
    this.postObg.inPlace.place = place.name;
    this.placeActive = place.name;
  }
  takeFriend(item){
    this.postObg.withFriend.push(item);
    this.friendActive = item.name;
  }
  delet(i){
    //noinspection TypeScriptValidateTypes
    this.postObg.withFriend.splice(i, 1) ;
  }
}
