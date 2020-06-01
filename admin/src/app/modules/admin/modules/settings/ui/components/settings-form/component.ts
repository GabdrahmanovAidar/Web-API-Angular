import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { AdminSettings } from "app/modules/admin/modules/settings/domain/interfaces/AdminSettings";

const validationMessages = require('./validation-messages.json');

@Component({
  selector: 'settings-components-settings-form',
  templateUrl: './template.html'
})
export class AdminSettingsComponentsAdminSettingsForm implements OnInit, OnDestroy {
  @Input() settings: AdminSettings;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<{ originalEvent: Event }>();
  @Output() successSubmit = new EventEmitter<AdminSettings>();

  public showFormErrors: boolean = false;
  public settingsForm: FormGroup;
  public validationMessages = validationMessages;
  private fieldsRequirement = {
    month_cost_rub: true
  };
  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.settingsForm = this.buildForm(this.settings);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  public onSubmit($event): void {
    $event.preventDefault();
    if (this.settingsForm.valid) {
      const genres = Object.assign({}, this.settings, this.settingsForm.value);
      this.successSubmit.emit(genres);
    } else {
      this.showFormErrors = true;
    }
  }

  public onCancelClicked($event): void {
    $event.preventDefault();
    this.cancel.emit({ originalEvent: $event });
  }

  public isRequired(fieldName): boolean {
    return this.fieldsRequirement[fieldName];
  }

  public get inputDisabled(): boolean {
    return this.disabled || this.loading;
  }

  private buildForm(settings: AdminSettings): FormGroup {
    return this.fb.group({
      commission: [settings && settings.commission, [Validators.required, Validators.min(0), Validators.max(100)]],
      limit: [settings && settings.limit, [Validators.required]],
      time_to_cancel: [settings && settings.time_to_cancel, [Validators.required]]
    })
  }
}
