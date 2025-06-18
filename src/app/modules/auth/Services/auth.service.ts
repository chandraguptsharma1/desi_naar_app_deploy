import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginuser(logindata: any) {
    return this.http.post(environment.baseUrl + '/users/login', logindata);
  }

  register(userData:any){
    return this.http.post(environment.baseUrl + `/users/register`,userData);
  }
}
