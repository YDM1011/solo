import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
@Component({
  selector: 'app-file-min',
  template: `<label>
    <input type="file" 
    style="display: none"
    (change)="uploadImg($event)">
        <div [innerHTML]="btn || 'upload'"></div>
    </label>`
})
export class FileMinComponent implements OnInit {
  public file: any;
  private fileResize: any;
  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  public imageObj: any = [];
  constructor() { }
  ngOnInit() {
    this.fileResize = [700, 220, 75];
  }
  private cx: CanvasRenderingContext2D;
  resultSize( size: number, small: number, resize: number): number {
    if ( small <= resize ) {
      return size;
    }
    return size / ( small / resize );
  }
  public uploadImg(ev: any) {
    this.file = ev.target.files[0];
    if ( !/image/i.test(this.file.type)) {
      console.log('Error type');
      this.fileResult.emit(false);
      return;
    }
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(this.file);
    fileReader.onload = (event: any) => {
      const img: HTMLImageElement = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
        this.cx = canvasImg.getContext('2d');
        const size: any = {
          width: img.naturalWidth,
          height: img.naturalHeight
        };
        const smallSide: number = (size.width >= size.height) ? size.height : size.width;
        this.fileResize.forEach(item=>{
          canvasImg.width = this.resultSize(size.width, smallSide, item);
          canvasImg.height = this.resultSize(size.height, smallSide, item);
          this.cx.drawImage(img, 0, 0, canvasImg.width , canvasImg.height );
          this.imageObj.push(canvasImg.toDataURL('image/jpeg', 0.8));
        });
        console.log(this.imageObj);
        this.fileResult.emit(this.imageObj);
        this.imageObj=[];
      };
    };

  }
}
