import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ud-colored-label',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UDColoredLabel {
  @Input() colorVariant: 'REJECTED' | 'NEW' | 'PUBLISHED' | 'NOT_ACTIVE';
  @Input() size: 'xs' | 'sm' | 'xxs' = 'sm';
  @Input() label: string;

  SizeEnum = {
    Small: 'sm',
    ExtraSmall: 'xs',
    XExtraSmall: 'xxs'
  };
}
