const qs = require('qs');

export function stringify(obj, options = { encode: false }): string {
  return qs.stringify(obj, options);
}

export function parse(str): any {
  return qs.parse(str);
}
