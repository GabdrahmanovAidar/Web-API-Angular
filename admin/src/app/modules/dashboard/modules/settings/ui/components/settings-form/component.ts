import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { CustomValidators } from "app/modules/shared/custom-validators";

const validationMessages = require('./validation-messages.json');
const fieldsRequirements = require('./fields-requirements.json');

@Component({
  selector: 'db-settings-components-settings-form',
  templateUrl: './template.html'
})
export class DBSettingsComponentsDBSettingsForm implements OnInit, OnDestroy {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<{ originalEvent: Event }>();

  public showFormErrors: boolean = false;
  public companyForm: FormGroup;
  public validationMessages = validationMessages;
  private fieldsRequirements = fieldsRequirements;
  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  

  public onCancelClicked($event): void {
    $event.preventDefault();
    this.cancel.emit({ originalEvent: $event });
  }

  public isRequired(fieldName): boolean {
    return this.fieldsRequirements[fieldName];
  }

  public get inputDisabled(): boolean {
    return this.disabled || this.loading;
  }

 
  
}
