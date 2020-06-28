import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cliente } from './cliente';

@Injectable()
export class ClienteService {

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  cadastrarCliente(cliente: Cliente) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Cliente>(environment.url + 'cadastrarcliente', JSON.stringify(cliente), { headers, observe: 'response' });
  }

  consultarClienteConta(cpf: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Cliente>(environment.url + 'buscarcliente/' + cpf, { headers, observe: 'response', withCredentials: true });
  }

}
