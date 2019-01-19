import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {ImageCropperComponent} from "ngx-image-cropper";
import {Ratios} from "./ratios";
@Component({
  selector: 'app-file-min',
  templateUrl: './file-min.component.html',
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

  ratios: number;

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
      this.imageChangedEvent = event;
      this.loadReader(this.format, event.target.files[0]);
    } else console.log('Error type');
  }

  imageCropped(event) {
    this.croppedImage = event.base64;
    this.loadImg(this.format, event.base64);
    console.log(event);
  }
  imageLoaded() {
    // this.showCropper = true;
    console.log('Image loaded')
  }

  loadReader(format: string, file: any) {
    this.file = file;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev: any) => {

      if(file)
      this.loadImg(format, ev.target.result)
    };
  }

  loadImg (format: string, base64: string) {
    this.name = this.file.name;
    this.size = this.file.size;
    console.log("OK",this.name, this.size);
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
    this.imageObj = [];
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
