import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const AUTH_API = '';

const headerDict = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const httpOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: FormGroup): Observable<any> {
    return this.http.post(AUTH_API + 'login', data, httpOptions);
  }
}
