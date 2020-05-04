import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'ud-forms-controls-wrap',
  templateUrl: './template.html'
})
export class UDFormsControlsWrap implements OnChanges, OnDestroy {
  @Input() showErrors: boolean;

  private formControls = new Set();

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('showErrors')) {
      this.formControls.forEach((formControl) => {
        formControl.setShowErrorsByHandle(this.showErrors);
      });
    }
  }

  ngOnDestroy() {
    this.formControls.clear();
  }

  public addControl(control) {
    this.formControls.add(control);
  }

  public removeControl(control) {
    this.formControls.delete(control);
  }
}
