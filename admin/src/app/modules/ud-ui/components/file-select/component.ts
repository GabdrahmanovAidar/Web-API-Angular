import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'ud-file-select',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class UDFileSelect {
  @Input() classNames: string;
  @Input() accept: string[] | undefined;

  @Input()
  set multiple(value) {
    this._multiple = value === false ? undefined : value;
  }

  get multiple() {
    return this._multiple;
  }

  private _multiple;

  @Output() select = new EventEmitter<{ files: File[], originalEvent: Event }>();

  public onInputChanged($event) {
    const inputElement = $event.currentTarget;
    let files = inputElement.files;
    files = files instanceof FileList || Array.isArray(files) ? Array.from(files) : [files];
    const result = { files, originalEvent: $event };
    this.select.emit(result);
    inputElement.value = '';
  }

  public get acceptMimeTypes(): string | undefined {
    return this.accept ? this.accept.join(',') : undefined;
  }
}
