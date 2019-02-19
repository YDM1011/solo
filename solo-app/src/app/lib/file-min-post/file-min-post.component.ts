import {Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-file-min-post',
  templateUrl: './file-min-post.component.html',
  styleUrls: ['./file-min-post.component.css'],
  animations: [
  trigger('inOpacity', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('140ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('120ms', style({ opacity: 0 }))
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
]
})
export class FileMinPostComponent implements OnInit, OnDestroy {

  @Input() btn;
  @Input() push: any;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  @Output() editFileResult: EventEmitter<any> = new EventEmitter<any>();

  public imageObj = '';
  public Pics: any = {
    def: '',
    name: '',
    size: ''
  };
  public editPics: any = {
    def: '',
    name: '',
    index: ''
  };
  public isShow: boolean = false;

  ngOnInit() {
  }
  ngOnDestroy() {
    this.Pics = {
      def: '',
      name: '',
      size: ''
    };
    this.editPics = {
      def: '',
      name: '',
      index: ''
    };
  }

  constructor() { }
  ngOnChanges() {
    if (this.push !== null) this.edit(this.push);
  }
  private cx: CanvasRenderingContext2D;

  public uploadImg(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (/image[/]/i.test(event.target.files[i].type)) {
        const format = (/image[/]png/i.test(event.target.files[i].type)) ? 'png' :
          (/image[/]svg[+]xml/i.test(event.target.files[i].type)) ? 'png' :'jpeg';
        this.loadReader(format, event.target.files[i]);
      } else  this.hidden();
    }
  }

  loadReader(format: string, file: any) {
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev: any) => {
      if(file) this.loadImg(format, ev.target.result, file.name, file.size)
    };
  }

  loadImg (format: string, base64: string, name: string, size: number) {
    const img: HTMLImageElement = new Image();
    img.src = base64;
    img.onload = () => {
      this.createImg(img, format);
      this.Pics = {
        def: this.imageObj,
        name: name,
        size: size
      };
      this.fileResult.emit(this.Pics);
      this.imageObj = '';
    };
  }
  resultSize(images: any, resize: number, pushSelector): void {
    let minSide = (images.naturalWidth >= images.naturalHeight) ? images.naturalHeight : images.naturalWidth;
    if ( images.naturalWidth <= minSide) {
      pushSelector.width = images.naturalWidth;
      pushSelector.height = images.naturalHeight;
    } else {
      pushSelector.width = Math.floor( images.naturalWidth / (minSide / resize));
      pushSelector.height = Math.floor( images.naturalHeight / (minSide / resize));
    }
  }
  createImg(images: any, format: string) {
    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');
    this.resultSize(images, 1080, canvasImg);
    this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
    this.imageObj = canvasImg.toDataURL(`image/${format}`, 0.75);
  }

  editImg(images: any, format: string, deg: number) {
    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');
    canvasImg.width = images.naturalHeight;
    canvasImg.height = images.naturalWidth;
    (deg > 0) ? this.cx.translate(canvasImg.width,0) : this.cx.translate(0, canvasImg.height);
    this.cx.rotate(deg * Math.PI / 180);
    this.cx.drawImage(images, 0, 0,  canvasImg.height ,  canvasImg.width);
    this.imageObj = canvasImg.toDataURL(`image/${format}`, 0.75);
  }

  edit(editObj){
    let format = editObj.def;
    format = format.split(';')[0].substring(5);

    const img: HTMLImageElement = new Image();
    img.src = editObj.def;
    img.onload = () => {
      this.editImg(img, format, editObj.transform);
      this.editPics = {
        def: this.imageObj,
        name: editObj.name,
        index: editObj.index
      };
      this.editFileResult.emit(this.editPics);
      this.imageObj = '';
    }
  }
  hidden() {
    this.isShow = !this.isShow;
    document.querySelector('body').style.overflow = (this.isShow) ? 'hidden' : '';
  }
}
