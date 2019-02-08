import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Kanji } from './kanji';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://kanji-back/chmn";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getKanjis(): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getKanjis')));
  }

  getKanji(id:number): Observable<Kanji> {
    const url = `${apiUrl}/view/${id}`;
    return this.http.get<Kanji>(url).pipe(
      tap(_ => console.log(`fetched kanji id=${id}`)),
      catchError(this.handleError<Kanji>(`getKanji id=${id}`))
    );
  }
}
