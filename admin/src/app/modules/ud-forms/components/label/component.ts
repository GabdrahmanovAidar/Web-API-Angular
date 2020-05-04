import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'ud-forms-label',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UDFormsLabel {
    @Input() attrFor: string = null;
    @Input() asRequired: boolean = false;
    @Input() style: object;
    @Input() styleClass: string;

    public get classNames() {
      let result = '';
      if (this.asRequired) result += 'label-required ';
      if (this.styleClass) result += this.styleClass;
      return result;
    }
}
