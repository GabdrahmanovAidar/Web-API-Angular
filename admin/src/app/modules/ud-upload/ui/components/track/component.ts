import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { UploadFileRepository } from "app/modules/ud-upload/domain/repositories/UploadFileRepository";
import { UploadFile } from "app/modules/ud-upload/domain/interfaces/UploadFile";
import { MimeTypeEnum } from "app/enums/MimeTypeEnum";

@Component({
  selector: 'ud-upload-track',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UDUploadTrack),
      multi: true
    }
  ]
})
export class UDUploadTrack implements ControlValueAccessor {
  @Input() acceptMimeTypes: MimeTypeEnum[];
  @Input() multiple: boolean = false;
  @Input() btnTitle: string;

  public value: any;
  public uploading: boolean = false;

  constructor(private uploadFileRepository: UploadFileRepository) {}

  public onFilesSelect($event) {
    this.uploadFile($event.files[0]);
  }

  public onDeleteClicked($event) {
    $event.preventDefault();
    this.value = null;
    this.onChangeCallback(null);
  }

  private uploadFile(file) {
    this.uploading = true;
    const fd = new FormData();
    fd.append('file', file);
    this.uploadFileRepository.create(fd)
      .finally(() => this.uploading = false)
      .subscribe((uploadedFile: UploadFile) => {
        this.value = uploadedFile;
        this.onChangeCallback(uploadedFile);
      });
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
