import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'udNumberSpacing' })
export class UDNumberSpacingPipe implements PipeTransform {
  transform(text: string|number|null, options = { by: 3, decimal_places: 3 }): any {
    if (text == null || isNaN(Number(text))) {
      return text;
    }

    let decimalBlocks = '1';
    for (let i = options.decimal_places; i > 0; i--) {
      decimalBlocks += '0';
    }
    const numberDecimalBlocks = Number(decimalBlocks);

    const textString = String(Math.round(Number(text) * numberDecimalBlocks) / numberDecimalBlocks);
    if (text != null) {
      let result = "";

      for (let i = 1; i <= textString.length; i++) {
        result = textString.substr(textString.length - i, 1) + result;
        if (i % options.by === 0) {
          result = " " + result;
        }
      }
      result = result.replace('. ', '.');
      result = result.replace(' .', '.');

      return result;
    }

    return textString;
  }
}
