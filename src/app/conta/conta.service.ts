import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cliente } from '../cliente/cliente';

@Injectable()
export class ContaService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  depositar(cliente: Cliente) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.url + 'conta/depositar', JSON.stringify(cliente), { headers, observe: 'response' });
  }

  sacar(cliente: Cliente) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.url + 'conta/sacar', JSON.stringify(cliente), { headers, observe: 'response' });
  }

  consultarSaldo(cpf: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(environment.url + 'conta/consultarsaldo/' + cpf, { headers, observe: 'response' });
  }

}
