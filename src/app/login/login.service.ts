import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  logar(cpf: string, senha: string) {
    let body = `username=${cpf}&password=${senha}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(environment.urlLogin + 'login', body, { headers, observe: 'response', withCredentials: true });
  }


}
