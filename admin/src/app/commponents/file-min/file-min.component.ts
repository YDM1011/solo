import {Component, OnInit, Output, EventEmitter, Input, ViewChild} from '@angular/core';
import {ImageCropperComponent} from "ngx-image-cropper";
import {Ratios} from "./ratios";

@Component({
  selector: 'app-file-min',
  templateUrl: './file-min.component.html',
  styleUrls: ['./file-min.component.css']
})
export class FileMinComponent implements OnInit {
  get imageCropper(): ImageCropperComponent {
    return this._imageCropper;
  }

  set imageCropper(value: ImageCropperComponent) {
    this._imageCropper = value;
  }
  public file: any;
  private fileResize: any;
  @Input() btn;
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

  ratios: number;

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
          const format = (/image[/]png/i.test(event.target.files[i].type)) ? 'png' : 'jpeg';
          this.loadReader(format, event.target.files[i]);
        } else console.log('Error type');
      }
    } else {
      if (/image[/]/i.test( event.target.files[0].type)) {
        this.format = (/image[/]png/i.test( event.target.files[0].type)) ? 'png' : 'jpeg';
        this.imageChangedEvent = event;
        this.loadReader(this.format, event.target.files[0]);
      } else console.log('Error type');
    }
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
  cropperReady() {
    console.log('Cropper ready')
  }
  loadImageFailed () {
    console.log('Load failed');
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

      if(file)
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
    this.imageObj = [];
  }
  createImg(images: any, originSize: object, format: string) {

    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');

    if (this.multiple) {
      this.fileResize.forEach(item => {
        this.resultSize(originSize, item, canvasImg);
        this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);

        let temp = canvasImg.toDataURL(`image/${format}`, 0.8);

        console.log(temp.length);
        // let img0: HTMLImageElement = new Image();
        // img0.src = temp;

        // this.renderer.appendChild(this.el.nativeElement, img0);

        this.imageObj.push(temp);
      });

    } else {
      this.resultSize(originSize, this.fileResize[0], canvasImg);
      this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
      this.imageObj.push(canvasImg.toDataURL(`image/${format}`, 0.8))
    }

  }
}
