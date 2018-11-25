import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-file-min',
  templateUrl: './file-min.component.html',
  styleUrls: ['./file-min.component.css']
})
export class FileMinComponent implements OnInit {
  public file: any;
  private fileResize: any;
  public isResult:boolean=false;
  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  @Input()  multiple: boolean = false;
  public imageObj: any = [];
  public Pics: any = {
    larg:'',
    preload:''
  };
  constructor() { }
  ngOnInit() {
    this.fileResize = [1024, 20];
  }
  private cx: CanvasRenderingContext2D;
  resultSize( size: number, small: number, resize: number): number {
    if ( small <= resize ) {
      return size;
    }
    return size / ( small / resize );
  }
  public uploadImg(ev: any) {
    if (this.multiple){
      for (let i=0; i<ev.target.files.length; i++){
        this.file = ev.target.files[i];
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
            this.Pics={
              larg:this.imageObj[0],
              preload:this.imageObj[1]
            };
            this.fileResult.emit(this.Pics);
            this.Pics = {
              larg:'',
              preload:''
            };
            this.imageObj=[];
          };
        };
      };

    }else{
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
          this.Pics={
            larg:this.imageObj[0],
            preload:this.imageObj[1]
          };
          this.fileResult.emit(this.Pics);
          this.Pics = {
            larg:'',
            preload:''
          };
          this.imageObj=[];
        };
      };
    }
  }
}
