import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

const validationMessages = require('./validation-messages.json');

@Component({
  selector: 'lesson-components-lesson-form-cover',
  styleUrls: ['./styles.scss'],
  templateUrl: './template.html'
})
export class LessonComponentsLessonFormCover {
  @Input() uploadForm: FormGroup;
  @Input() isLast: boolean;
  @Input() index: number;
  @Input() disabled:  boolean = false;
  @Output() coverDelete = new EventEmitter<{ originalEvent: Event }>();


  public validationMessages = validationMessages;
  private fieldsRequirement = {
    title: true,
    upload: true
  };

  public isRequired(fieldName): boolean {
    return this.fieldsRequirement[fieldName];
  }

  public onDeleteClicked($event): void {
    $event.preventDefault();
    this.coverDelete.emit({ originalEvent: $event });
  }

}
