import { PipeTransform, Pipe } from '@angular/core';
import { UserShortNameFormatter } from "app/modules/ud-ui/pipes/user-short-name/UserShortNameFormatter";

@Pipe({ name: 'udUserShortName' })
export class UDShortNamePipe implements PipeTransform {

  constructor(private formatter: UserShortNameFormatter) {
  }

  transform(user: { last_name?: string, first_name?: string, patronymic_name?: string }): string {
    return this.formatter.formatName(user);
  }
}
