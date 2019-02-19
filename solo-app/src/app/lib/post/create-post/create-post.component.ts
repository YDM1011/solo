import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Input() firstName: string = '';
  @Input() avatar: any;
  @Input() id: string;
  @Input() place: any;
  public btn = '<span class="post-up_button"><span class="post-up_svg"></span><span class="post-up_title">Додати фото</span></span>';
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
    private cooki: CookieService
  ) { }


  ngOnInit() {
  }

  addPost(post) {
  }
  take(imression) {
  }
  takePlace(place) {
  }
  clearPlace(){
    console.log(1)
  }
  takeFriend(item) {
  }
  delet(i) {
  }
  removeImg(i){
  }
  rotate(i: number, transform: number){
  }
  newEditImg(obj) {
  }
  savePost(){
  }

}
