import * as Raven from 'raven-js';
import { ErrorHandler } from "@angular/core";

// if (ENV === 'production') {
//   Raven
//     .config(process.env.RAVEN_DSN, {
//       release: process.env.RELEASE
//     })
//     .install();
// }

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}
