import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:4000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  showmsg(data:any){
    let url = `${this.baseUrl}/messages/`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ' + error.status + '\n' + 'Message: ' + error.message;
    }
    console.log(error);
    return throwError(() => {
      return errorMessage
    });
  }
}
