import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Kanji } from './kanji';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "/chmn";

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

  getKanji(id): Observable<Kanji> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Kanji>(url).pipe(
      tap(_ => console.log(`fetched kanji id=${id}`)),
      catchError(this.handleError<Kanji>(`getKanji id=${id}`))
    );
  }

  addKanji(kanji): Observable<Kanji> {
    return this.http.post<Kanji>(apiUrl, kanji, httpOptions).pipe(
      tap((kanji: Kanji) => console.log(`added kanji w/ id=${kanji.id}`)),
      catchError(this.handleError<Kanji>('addKanji'))
    );
  }

  updateKanji(id, kanji): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, kanji, httpOptions).pipe(
      tap(_ => console.log(`updated kanji id=${id}`)),
      catchError(this.handleError<any>('updateKanji'))
    );
  }

  deleteKanji(id): Observable<Kanji> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Kanji>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted kanji id=${id}`)),
      catchError(this.handleError<Kanji>('deleteKanji'))
    );
  }
}
