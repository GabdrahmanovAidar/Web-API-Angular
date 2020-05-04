import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild, ViewChildren } from "@angular/core";
import Cropper from "cropperjs";

const defaultCropOptions = {
  viewMode: 2,
  minContainerWidth: 500,
  minContainerHeight: 300,
  minCropBoxWidth: 200,
  minCropBoxHeight: 200,
};

@Component({
  selector: 'ud-upload-photo-crop',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class UDUploadPhotoCrop implements AfterViewInit, OnDestroy {
  @Input() imageUrl: string;
  @Input() imageFile: File;
  @Input() options: any;

  @Output() saveCropped = new EventEmitter<Blob>();
  @Output() cancel = new EventEmitter<{ originalEvent: Event }>();

  @ViewChild('image') image: ElementRef;

  private cropper: any;

  ngAfterViewInit() {
    this.initCropper();
  }

  ngOnDestroy() {
    this.destroyCropper();
  }

  public onSaveCropClicked($event) {
    $event.preventDefault();
    const canvas = this.cropper.getCroppedCanvas();
    canvas.toBlob((blob) => this.saveCropped.emit(blob), this.imageFile.type);
  }

  public onCancelClicked($event) {
    $event.preventDefault();
    this.cancel.emit({ originalEvent: $event });
  }

  private initCropper() {
    if (this.cropper) {
      this.destroyCropper();
    }
    const options = Object.assign({}, defaultCropOptions, this.options);
    this.cropper = new Cropper(this.image.nativeElement, options);
  }

  private destroyCropper() {
    this.cropper.destroy();
    this.cropper = null;
  }

}
