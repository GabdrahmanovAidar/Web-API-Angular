import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'udMoreNull' })
export class UDMoreNullPipe implements PipeTransform {
    transform(input: string|number): any {
        if (input != null) {
          const number = Number(input);
          if (!isNaN(number)) {
            return number >= 0 ? number : 0;
          }
        }

        return input;
    }
}
