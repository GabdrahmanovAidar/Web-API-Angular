import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'udHighlight' })
export class UDHighlightPipe implements PipeTransform {
    transform(text: string|number, search): any {
        if (text != null) {
            const textString = String(text);
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            pattern = pattern.split(' ').filter((t) => {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'gi');

            return search
                ? textString.replace(regex, (match) => `<span class="text-highlight">${match}</span>`)
                : textString;
        }

        return text;
    }
}
