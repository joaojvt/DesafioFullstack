import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = 'http://localhost:3000'
  token: string;


  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessege(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  login(user: User): Observable<any> {
    const url = `${this.baseUrl}/login`
    return this.http.post<any>(url, user);
  }

  setToken(token: string): void {
    this.token = token
  }

  getUserByToken(): Observable<User> {
    const url = `${this.baseUrl}/me`
    const headers = { 'Authorization': `Bearer ${this.token}` }
    return this.http.get<User>(url, { headers })
  }

  create(user: User): Observable<User> {
    const url = `${this.baseUrl}/user`
    const headers = { 'Authorization': `Bearer ${this.token}` }
    return this.http.post<User>(url, user, { headers })
  }

  read(): Observable<User[]> {
    const url = `${this.baseUrl}/users`
    const headers = { 'Authorization': `Bearer ${this.token}` }
    return this.http.get<User[]>(url, { headers })
  }

  readById(id: string): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`
    const headers = { 'Authorization': `Bearer ${this.token}` }
    return this.http.get<User>(url, { headers })
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/user/${user._id}`
    const headers = { 'Authorization': `Bearer ${this.token}` }
    return this.http.patch<User>(url, user, { headers })
  }

  delete(id: string): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`
    const headers = { 'Authorization': `Bearer ${this.token}` }
    return this.http.delete<User>(url, { headers })
  }
}
