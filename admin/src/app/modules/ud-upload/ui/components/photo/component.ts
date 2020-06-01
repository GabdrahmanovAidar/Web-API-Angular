import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { UploadFileRepository } from "app/modules/ud-upload/domain/repositories/UploadFileRepository";
import { UploadFile } from "app/modules/ud-upload/domain/interfaces/UploadFile";
import { MimeTypeEnum } from "app/enums/MimeTypeEnum";

@Component({
  selector: 'ud-upload-photo',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UDUploadPhoto),
      multi: true
    }
  ]
})
export class UDUploadPhoto implements ControlValueAccessor {
  @Input() width;
  @Input() height: string = '75px';
  @Input() showOnUpload: boolean = true;
  @Input() cropOptions;
  public uploading: boolean = false;
  public value: UploadFile;
  public showCropWindow: boolean = false;
  public cropImageUrl: string;
  public cropImageFile: File;

  constructor(private uploadFileRepository: UploadFileRepository) {}

  public acceptMimeTypes = [
    MimeTypeEnum.ImageGif,
    MimeTypeEnum.ImagePng,
    MimeTypeEnum.ImageJpeg,
  ];

  public onFilesSelect($event) {
    if (!this.cropOptions) {
      this.uploadFile($event.files[0]);
    } else {
      this.showCropModal($event.files[0]);
    }
  }

  public onDeletePhotoClicked($event) {
    $event.preventDefault();
    this.value = null;
    this.onChangeCallback(null);
  }

  public onCropCancel() {
    this.showCropWindow = false;
  }

  public onImageCropped(imageBlob) {
    this.uploadFile(imageBlob);
    this.showCropWindow = false;
  }

  private uploadFile(file: Blob | File) {
    this.uploading = true;
    const fd = new FormData();
    let fileName = this.cropOptions ? this.cropImageFile.name : (file as File).name;
    fd.append('file', file, fileName);
    this.uploadFileRepository.create(fd)
      .finally(() => this.uploading = false)
      .subscribe((uploadedPhoto: UploadFile) => {
        if (this.showOnUpload) {
          this.value = uploadedPhoto;
        }
        this.onChangeCallback(uploadedPhoto);
      });
  }

  public showCropModal(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.cropImageUrl = reader.result as string;
      this.cropImageFile = file;
      this.showCropWindow = true;
    };
    reader.readAsDataURL(file);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
  };

  private onChangeCallback: (_: any) => void = (_: any) => {
  };

}
