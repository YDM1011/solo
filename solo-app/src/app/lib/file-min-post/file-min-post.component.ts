import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';

@Component({
  selector: 'app-file-min-post',
  templateUrl: './file-min-post.component.html',
  styleUrls: ['./file-min-post.component.css']
})
export class FileMinPostComponent implements OnInit {

  public file: any;
  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();

  public imageObj: string;
  public name;
  public size;
  public Pics: any = {
    def: '',
    crop: '',
    name: '',
    size: ''
  };

  constructor() { }
  ngOnInit() {
  }

  private cx: CanvasRenderingContext2D;

  public uploadImg(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (/image[/]/i.test(event.target.files[i].type)) {
        const format = (/image[/]png/i.test(event.target.files[i].type)) ? 'png' : 'jpeg';
        this.loadReader(format, event.target.files[i]);
      } else console.log('Error type');
    }
  }

  loadReader(format: string, file: any) {
    this.file = file;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev: any) => {
      if(file) this.loadImg(format, ev.target.result)
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
      this.Pics = {
        def: this.imageObj,
        name: this.name,
        size: this.size
      };
      this.fileResult.emit(this.Pics);
      this.imageObj = '';
      console.log(this.Pics);
    };
  }

  createImg(images: any, format: string) {
    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');
    canvasImg.width = images.naturalWidth;
    canvasImg.height = images.naturalHeight;
    this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
    this.imageObj = canvasImg.toDataURL(`image/${format}`, 0.8);
  }
}
