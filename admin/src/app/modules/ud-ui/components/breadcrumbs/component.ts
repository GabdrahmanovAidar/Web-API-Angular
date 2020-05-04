import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'ud-breadcrumbs',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class UDBreadcrumbs {
  @Input() items: Array<{ label: string, link: any }>;
}
