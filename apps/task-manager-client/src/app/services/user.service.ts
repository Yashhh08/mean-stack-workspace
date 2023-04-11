import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../../../../libs/user.model';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:3333/users";

  currentUser: any | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(this.baseUrl + "/login", user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
        this.currentUser = res;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  logout(user: any): Observable<boolean> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return new Observable<boolean>((observer) => {
      this.http.post(this.baseUrl + "/logout", user, { headers: headers }).subscribe(
        (res) => {
          this.currentUser = null;
          localStorage.setItem('token', "");
          this.router.navigate(["/"]);
          observer.next(true);
          observer.complete();
        },
        (err) => {
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

}
