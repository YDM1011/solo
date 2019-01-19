import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';

@Component({
  selector: 'app-file-min-post',
  templateUrl: './file-min-post.component.html',
  styleUrls: ['./file-min-post.component.css']
})
export class FileMinPostComponent implements OnInit {

  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();

  public imageObj: string;
  public Pics: any = {
    def: '',
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

  createImg(images: any, format: string) {
    const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
    this.cx = canvasImg.getContext('2d');
    canvasImg.width = images.naturalWidth;
    canvasImg.height = images.naturalHeight;
    this.cx.drawImage(images, 0, 0,  canvasImg.width ,  canvasImg.height);
    this.imageObj = canvasImg.toDataURL(`image/${format}`, 0.8);
  }
}
