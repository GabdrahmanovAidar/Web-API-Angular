import { PipeTransform, Pipe } from '@angular/core';

const moment = require('moment');

@Pipe({ name: 'udDateTimeDiff' })
export class UDDateTimeDiffPipe implements PipeTransform {
  transform(datetimeFrom: string|Date, datetimeTo: string|Date): string {
    if (datetimeFrom != null && datetimeFrom !== '' && datetimeTo != null && datetimeTo !== '') {
      const from = moment(datetimeFrom);
      const to = moment(datetimeTo);
      return moment.duration(from.diff(to)).locale('ru').humanize();
    }
    return null;
  }
}
