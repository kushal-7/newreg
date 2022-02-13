import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const AUTH_API = 'https://himalancer.herokuapp.com/himalancer/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: FormGroup): Observable<any> {
    return this.http.post(AUTH_API + 'login-customer', data, httpOptions);
  }

  register(data: FormGroup): Observable<any> {
    return this.http.post(AUTH_API + 'register-customer', data, httpOptions);
  }
}
