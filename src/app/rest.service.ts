import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

	constructor(private http: HttpClient) {
	  
	  
	}
  
	//endpoint = 'http://localhost:3000/api/v1/';
	endpoint = 'http://kanji-back/';
	httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json'
	  })
	};
	
	private extractData(res: Response) {
	  let body = res;
	  return body || { };
	}
	
	getKanjis(): Observable<any> {
	  return this.http.get(this.endpoint + 'chmn').pipe(
		map(this.extractData));
	}

	getKanji(id): Observable<any> {
	  return this.http.get(this.endpoint + 'chmn/view/' + id).pipe(
		map(this.extractData));
	}

	addKanji(kanji): Observable<any> {
	  console.log(kanji);
	  return this.http.post<any>(this.endpoint + 'chmn', JSON.stringify(kanji), this.httpOptions).pipe(
		tap((kanji) => console.log(`added kanji w/ id=${kanji.id}`)),
		catchError(this.handleError<any>('addKanji'))
	  );
	}

	updateKanji(id, kanji): Observable<any> {
	  return this.http.put(this.endpoint + 'chmn/' + id, JSON.stringify(kanji), this.httpOptions).pipe(
		tap(_ => console.log(`updated kanji id=${id}`)),
		catchError(this.handleError<any>('updateKanji'))
	  );
	}

	deleteKanji(id): Observable<any> {
	  return this.http.delete<any>(this.endpoint + 'chmn/' + id, this.httpOptions).pipe(
		tap(_ => console.log(`deleted kanji id=${id}`)),
		catchError(this.handleError<any>('deleteKanji'))
	  );
	}
	
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		console.log(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	  };
	}
}
