import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {ImageCropperComponent} from "ngx-image-cropper";
import {Ratios} from "./ratios";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-file-min',
  templateUrl: './file-min.component.html',
  styleUrls: ['./file-min.component.css'],
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
  public isShow: boolean = false;

  private fileResize: any;

  @Input() btn = "<button>Завантажити</button>>";
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  @Input()  multiple: boolean = false;
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
    this.fileResize = [1024, 1024];
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
  //

  public uploadImg(event: any) {
    if (this.multiple) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (/image[/]/i.test(event.target.files[i].type)) {
          const format = (/image[/]png/i.test(event.target.files[i].type)) ? 'png' :
            (/image[/]svg[+]xml/i.test(event.target.files[i].type)) ? 'png' :'jpeg';
          this.loadReader(format, event.target.files[i]);
        } else this.hidden();
      }
    } else {
      if (/image[/]/i.test( event.target.files[0].type)) {
        this.format =  (/image[/]png/i.test(event.target.files[0].type)) ? 'png' :
          (/image[/]svg[+]xml/i.test(event.target.files[0].type)) ? 'png' :'jpeg';
        document.querySelector('body').style.overflow = 'hidden';
        this.imageChangedEvent = event;
        this.loadReader(this.format, event.target.files[0]);
      } else this.hidden();
    }
  }

  imageCropped(event) {
    this.croppedImage = event;
    this.loadImg(this.format, event);
  }

  resultSize(size: any, resize: number, pushSelector): void {
    console.log('size', size);
    if ( size.width <= size.size) {
      pushSelector.width = size.width;
      pushSelector.height = size.height;
    } else {
      pushSelector.width = Math.floor( size.width / (size.size / resize));
      pushSelector.height = Math.floor( size.height / (size.size / resize));
    }
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
      console.log('img', img);
      const originSize: object = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: (img.naturalWidth >= img.naturalHeight) ? img.naturalHeight : img.naturalWidth
      };

      this.fileResize[0] = (img.naturalWidth >= img.naturalHeight) ? img.naturalHeight : img.naturalWidth;

      this.createImg(img, originSize, format);
      if (this.multiple) {
        this.Pics = {
          def: this.imageObj[0],
          crop: this.imageObj[1],
          name: this.name,
          size: this.size
        };
        this.fileResult.emit(this.Pics);
        this.imageObj = [];
      }

      console.log(this.Pics);
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
    this.clear();
  }
  createImg(images: any, originSize: object, format: string) {

    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');

    if (this.multiple) {
      this.fileResize.forEach(item => {
        this.resultSize(originSize, item, canvasImg);
        this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
        this.imageObj.push(canvasImg.toDataURL(`image/${format}`, 0.8));
      });

    } else {
      this.resultSize(originSize, this.fileResize[0], canvasImg);
      this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
      this.imageObj.push(canvasImg.toDataURL(`image/${format}`, 0.8))
    }

  }

  clear() {
    this.file = null;
    this.imageObj = [];
    document.querySelector('body').style.overflow = '';
  }

  hidden() {
    this.isShow = !this.isShow;
    document.querySelector('body').style.overflow = (this.isShow) ? 'hidden' : '';
  }
}
