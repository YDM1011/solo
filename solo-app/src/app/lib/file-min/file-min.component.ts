import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {ImageCropperComponent} from "ngx-image-cropper";
import {Ratios} from "./ratios";
import {animate, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'app-file-min',
  templateUrl: './file-min.component.html',
  animations: [
    trigger('inOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('140ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('140ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('inPop', [
      transition(':enter', [
        style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }),
        animate('220ms', style({
          transform: 'scaleX(1) scaleY(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('120ms', style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }))
      ])
    ])
  ],
})

export class FileMinComponent implements OnInit {
  get imageCropper(): ImageCropperComponent {
    return this._imageCropper;
  }

  set imageCropper(value: ImageCropperComponent) {
    this._imageCropper = value;
  }
  public file: any;
  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  @Input()  model: string;
  @Input()  field: string;
  public imageObj: any = [];
  public name;
  public size;
  public Pics: any = {
    def: '',
    crop: '',
    name: '',
    size: ''
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';
  format: string = 'jpeg';

  ratios: any = {
    ratios: '',
    width: ''
  };

  constructor() { }
  ngOnInit() {
    this.ratios = new Ratios().getRatios(this.model,this.field);
  }
  ngOnChanges(){
    this.ratios = new Ratios().getRatios(this.model,this.field);
  }

  @ViewChild(ImageCropperComponent) private _imageCropper: ImageCropperComponent;

  private cx: CanvasRenderingContext2D;

  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }

  public uploadImg(event: any) {
    if (/image[/]/i.test( event.target.files[0].type)) {
      this.format = (/image[/]png/i.test( event.target.files[0].type)) ? 'png' : 'jpeg';
      document.querySelector('body').style.overflow = 'hidden';
      this.loadReader(this.format, event.target.files[0]);
      this.imageChangedEvent = event;
    } else console.log('Error type');
  }

  imageCropped(event) {
    this.croppedImage = event.base64;
    this.loadImg(this.format, event.base64);
  }

  loadReader(format: string, file: any) {
    this.file = file;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev: any) => {
      this.loadImg(format, ev.target.result)
    };
  }

  loadImg (format: string, base64: string) {
    this.name = this.file.name;
    this.size = this.file.size;
    const img: HTMLImageElement = new Image();
    img.src = base64;
    img.onload = () => {
      this.createImg(img, format);
    };
  }
  push(){
    this.Pics = {
      def: this.imageObj[0],
      crop: this.imageObj[this.imageObj.length - 1],
      name: this.name,
      size: this.size
    };
    this.fileResult.emit(this.Pics);
    this.clear()
  }
  clear() {
    this.imageObj = [];
    document.querySelector('body').style.overflow = '';
  }
  createImg(images: any, format: string) {
    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');
    canvasImg.width = images.naturalWidth;
    canvasImg.height = images.naturalHeight;
    this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
    if (this.imageObj.length == 0) {
      this.imageObj.push(canvasImg.toDataURL(`image/${format}`, 0.8));
    } else this.imageObj[1] = canvasImg.toDataURL(`image/${format}`, 0.8);

  }
}
