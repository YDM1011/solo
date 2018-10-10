import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
@Component({
  selector: 'app-file-min',
  template: `<label *ngIf="!multiple">
    <input type="file" 
    style="display: none"
    (change)="uploadImg($event)" *ngIf="!multiple">
        <div [innerHTML]="btn || 'upload'"></div>
    </label>
    <label *ngIf="multiple">
      <input type="file" 
      style="display: none"
      (change)="uploadImg($event)"  multiple="multiple">
          <div [innerHTML]="btn || 'upload'"></div>
    </label>`
})

export class FileMinComponent implements OnInit {
  public file: any;
  private fileResize: any;
  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  @Input()  multiple: boolean = false;
  public imageObj: any = []
  public Pics: any = {
    larg:'',
    imgMax:'',
    img:'',
    imgMin:'',
    preload:''
  };
  constructor() { }
  ngOnInit() {
    this.fileResize = [1024, 512, 128, 64, 16];
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
              this.imageObj.push(canvasImg.toDataURL('image/jpeg', 0.3));
            });
            this.Pics={
              larg:this.imageObj[0],
              imgMax:this.imageObj[1],
              img:this.imageObj[2],
              imgMin:this.imageObj[3],
              preload:this.imageObj[4]
            };
            this.fileResult.emit(this.Pics);
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
            imgMax:this.imageObj[1],
            img:this.imageObj[2],
            imgMin:this.imageObj[3],
            preload:this.imageObj[4]
          };
          this.fileResult.emit(this.Pics);
          this.imageObj=[];
        };
      };
    }


  }
}
