import { SvgRectangleDimensions } from './../models/SvgRectangleDimensions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  apiURL = 'https://localhost:7017/api';
  constructor(private http: HttpClient) {}

  getDimensions(): Observable<SvgRectangleDimensions> {
    return this.http
      .get<SvgRectangleDimensions>(this.apiURL + '/svg')
      .pipe(retry(1), catchError(this.handleError));
  }

  setDimensions(dimensions: SvgRectangleDimensions) {
    debugger;
    return this.http
      .put(this.apiURL + '/svg', dimensions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
