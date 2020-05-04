import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { UploadFileRepository } from "app/modules/ud-upload/domain/repositories/UploadFileRepository";
import { UploadFile } from "app/modules/ud-upload/domain/interfaces/UploadFile";
import { MimeTypeEnum } from "app/enums/MimeTypeEnum";

@Component({
    selector: 'ud-upload-video',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UDUploadVideo),
            multi: true
        }
    ]
})
export class UDUploadVideo implements ControlValueAccessor {
    @Input() width;
    @Input() height: string = '75px';
    @Input() showOnUpload: boolean = true;
    public uploading: boolean = false;
    public value: UploadFile;

    constructor(private uploadFileRepository: UploadFileRepository) { }

    public accept = [
        MimeTypeEnum.VideoMp4,
        MimeTypeEnum.VideoMpeg
    ];

    public get acceptMimeTypes(): string | undefined {
        return this.accept ? this.accept.join(',') : undefined;
    }

    public onFilesSelect(event) {
        this.uploadFile(event);
    }

    public onDeleteVideoClicked($event) {
        $event.preventDefault();
        this.value = null;
        this.onChangeCallback(null);
    }

    public uploadFile(event) {
        const file = event.target.files[0];
        if (!file) { return; }
        const fd = new FormData();
        const fileName = (file as File).name;
        fd.append('file', file, fileName);
        this.uploadFileRepository.create(fd)
            .subscribe((uploadedVideo: UploadFile) => {
                if (this.showOnUpload) {
                    this.value = uploadedVideo;
                }
                this.onChangeCallback(uploadedVideo);
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

    // tslint:disable-next-line:no-empty
    private onTouchedCallback: () => void = () => {
    };

    // tslint:disable-next-line:no-empty
    private onChangeCallback: (_: any) => void = (_: any) => {
    };

}
