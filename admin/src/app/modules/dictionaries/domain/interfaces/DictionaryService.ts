import { Observable } from "rxjs/Observable";

export interface DictionaryService {
  get(query?: any): Observable<any>
}
