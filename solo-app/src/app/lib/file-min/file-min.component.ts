import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
@Component({
  selector: 'app-file-min',
  templateUrl: './file-min.component.html',
})

export class FileMinComponent implements OnInit {
  public file: any;
  private fileResize: any;
  @Input() btn;
  @Output() fileResult: EventEmitter<any> = new EventEmitter<any>();
  @Input()  multiple: boolean = false;
  public imageObj: any = [];
  public Pics: any = {
    def: '',
    crop: ''
  };
  //
  imageChangedEvent: any = '';
  croppedImage: any = '';
  format: string = 'jpeg';

  ratios: number = 9 / 16;
  //
  constructor() { }
  ngOnInit() {
    this.fileResize = [1024, 1024];
  }

  private cx: CanvasRenderingContext2D;

  // rotateLeft() {
  //   this.imageCropper.rotateLeft();
  // }
  // rotateRight() {
  //   this.imageCropper.rotateRight();
  // }
  // flipHorizontal() {
  //   this.imageCropper.flipHorizontal();
  // }
  // flipVertical() {
  //   this.imageCropper.flipVertical();
  // }
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
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev: any) => {
      this.loadImg(format, ev.target.result)
    };
  }

  loadImg (format: string, base64: string) {
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
          imgMin: this.imageObj[1],
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
      crop: this.imageObj[1],
      imgMin: this.imageObj[1],
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

  // public uploadImg(ev: any) {
  //   for (let i = 0; i < ev.target.files.length; i++) {
  //     if (/image[/]/i.test(ev.target.files[i].type)) {
  //       this.file = ev.target.files[i];
  //       const format = (/image[/]png/i.test(ev.target.files[i].type)) ? ev.target.files[i].type : 'image/jpeg';
  //       console.log(format);
  //       this.loadImg(format);
  //     } else {
  //       console.log('Error type');
  //     }
  //   }
  // }

  // public uploadImg(ev: any) {
  //   if (this.multiple) {
  //     for (let i = 0; i < ev.target.files.length; i++) {
  //       this.file = ev.target.files[i];
  //       if ( !/image/i.test(this.file.type)) {
  //         console.log('Error type');
  //         this.fileResult.emit(false);
  //         return;
  //       }
  //       const fileReader: FileReader = new FileReader();
  //       fileReader.readAsDataURL(this.file);
  //       fileReader.onload = (event: any) => {
  //         const img: HTMLImageElement = new Image();
  //         img.src = event.target.result;
  //         img.onload = () => {
  //           const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
  //           this.cx = canvasImg.getContext('2d');
  //           const size: any = {
  //             width: img.naturalWidth,
  //             height: img.naturalHeight
  //           };
  //           const smallSide: number = (size.width >= size.height) ? size.height : size.width;
  //           this.fileResize.forEach(item => {
  //             canvasImg.width = this.resultSize(size.width, smallSide, item);
  //             canvasImg.height = this.resultSize(size.height, smallSide, item);
  //             this.cx.drawImage(img, 0, 0, canvasImg.width , canvasImg.height );
  //             this.imageObj.push(canvasImg.toDataURL('image/jpeg', 0.3));
  //           });
  //           this.Pics = {
  //             larg: this.imageObj[0],
  //             imgMax: this.imageObj[1],
  //             img: this.imageObj[2],
  //             imgMin: this.imageObj[3],
  //             preload: this.imageObj[4]
  //           };
  //           this.fileResult.emit(this.Pics);
  //           this.imageObj = [];
  //         };
  //       };
  //     }
  //
  //   } else {
  //     this.file = ev.target.files[0];
  //     if ( !/image/i.test(this.file.type)) {
  //       console.log('Error type');
  //       this.fileResult.emit(false);
  //       return;
  //     }
  //     const fileReader: FileReader = new FileReader();
  //     fileReader.readAsDataURL(this.file);
  //     fileReader.onload = (event: any) => {
  //       const img: HTMLImageElement = new Image();
  //       img.src = event.target.result;
  //       img.onload = () => {
  //         const canvasImg = <HTMLCanvasElement> document.createElement('canvas');
  //         this.cx = canvasImg.getContext('2d');
  //         const size: any = {
  //           width: img.naturalWidth,
  //           height: img.naturalHeight
  //         };
  //         const smallSide: number = (size.width >= size.height) ? size.height : size.width;
  //         this.fileResize.forEach(item => {
  //           canvasImg.width = this.resultSize(size.width, smallSide, item);
  //           canvasImg.height = this.resultSize(size.height, smallSide, item);
  //           this.cx.drawImage(img, 0, 0, canvasImg.width , canvasImg.height );
  //           this.imageObj.push(canvasImg.toDataURL('image/jpeg', 0.8));
  //         });
  //         this.Pics = {
  //           larg: this.imageObj[0],
  //           imgMax: this.imageObj[1],
  //           img: this.imageObj[2],
  //           imgMin: this.imageObj[3],
  //           preload: this.imageObj[4]
  //         };
  //         this.fileResult.emit(this.Pics);
  //         this.imageObj = [];
  //       };
  //     };
  //   }
  //
  //
  // }
}
