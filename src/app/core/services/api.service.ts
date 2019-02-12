import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Kanji } from '../../shared/models/kanji.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getKanjis(api: string, params: string): Observable<any> {
    const url = `${apiUrl}/${api}?${params}`;
    console.log(url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getKanjis')));
  }

  getKanji(id): Observable<Kanji> {
    const url = `${apiUrl}/chmn/?mine=1&hanzi=${id}`;
    console.log(url);
    return this.http.get<Kanji>(url).pipe(
      tap(_ => console.log(`fetched kanji id=${id}`)),
      catchError(this.handleError<Kanji>(`getKanji id=${id}`))
    );
  }
}
