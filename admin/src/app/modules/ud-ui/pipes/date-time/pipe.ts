import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

const defaultOptions = {
  displayFormat: 'D MMM YYYY г. в HH:mm',
  parseFormat: 'YYYY-MM-DDTHH:mm:ss',
  isCalendar: false,
  isUTC: false,
  needToLocal: false,
  needUTCToLocal: true
};

@Pipe({ name: 'udDateTime' })
export class UDDateTimePipe implements PipeTransform {
  transform(datetime: string | Date, o: any): string {
    const options = Object.assign({}, defaultOptions, o);
    if (typeof datetime === 'string') {
      if (options.isCalendar) {
        if (options.isUTC) {
          return moment.utc(datetime, options.parseFormat).calendar();
        }
        if (options.needToLocal) {
          return moment(datetime, options.parseFormat).local().calendar();
        }
        if (options.needUTCToLocal) {
          return moment.utc(datetime, options.parseFormat).local().calendar();
        }
        return moment(datetime, options.parseFormat).calendar();
      } else {
        if (options.isUTC) {
          return moment.utc(datetime, options.parseFormat).format(options.displayFormat);
        }
        if (options.needToLocal) {
          return moment(datetime, options.parseFormat).local().format(options.displayFormat);
        }
        if (options.needUTCToLocal) {
          return moment.utc(datetime, options.parseFormat).local().format(options.displayFormat);
        }
        return moment(datetime, options.parseFormat).format(options.displayFormat);
      }
    }

    // todo parse Date object
    return datetime as any;
  }
}
