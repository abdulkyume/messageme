import { Injectable } from '@angular/core';
import { User } from 'src/model/user';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:4000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //create user
  createuser(data: any) {
    let url = this.baseUrl + '/signup';
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    );
  }
  //check login
  checklogin(data: any) {
    let url = this.baseUrl + '/login';
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    );
  }
  //check login
  getprofile(data: any) {
    let url = this.baseUrl + '/profile';
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    );
  }

  getaddprofile(data: any){
    let url = this.baseUrl + `/addfriends/profile/${data}`;
    return this.http.get(url).pipe(
      catchError(this.errorMgmt)
    );
  }
  
  searchHeroes(email: any) {
    let url = this.baseUrl + '/addfriends';
    return this.http.post(url, email).pipe(
      catchError(this.errorMgmt)
    );
  }

  addfriend(uid:any, data:any){
    let url = `${this.baseUrl}/addfriends/profile/${uid}`;
    data = {data};
    return this.http.put(url, data).pipe(
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