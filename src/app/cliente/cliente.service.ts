import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ClienteService {

  constructor(@Inject(HttpClient) private http: HttpClient, private cookieService: CookieService, @Inject(Router) private router: Router) { }

  cadastrarCliente(nomeCompleto: string, cpf: number, senha: string, loading: boolean, resposta: number) {
    let body = `nomeCompleto=${nomeCompleto}&cpf=${cpf}&senha=${senha}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post(environment.urlLogin + 'cadastrarcliente', body, { headers, observe: 'response', withCredentials: true })
    .subscribe(
      response => {
        loading = false;
        resposta = response.status;
        if(resposta == 200) {
          alert("requisição enviada")
        }
      },
      error => {
        loading = false;
        resposta = error.status;
        alert("requisição falha")
      }
    );
  }

}
