import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(@Inject(HttpClient) private http: HttpClient, private cookieService: CookieService, @Inject(Router) private router: Router) { }

  logar(cpf: number, senha: string, loading: boolean, resposta: number) {
    let body = `cpf=${cpf}&senha=${senha}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post(environment.urlLogin + 'login', body, { headers, observe: 'response', withCredentials: true })
    .subscribe(
      response => {
        loading = false;
        resposta = response.status;
        if(resposta == 200) {
          this.cookieService.set('clienteLogado', cpf.toString());
          this.router.navigateByUrl('capgemini/conta');
        }
      },
      error => {
        loading = false;
        resposta = error.status;
      }
    );
  }


}
