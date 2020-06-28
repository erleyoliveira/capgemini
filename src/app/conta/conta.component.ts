import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ContaService } from './conta.service';
import { Cliente } from '../cliente/cliente';
import { ClienteService } from '../cliente/cliente.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  cliente: Cliente = null;
  operacao: number = null;
  valorOperacao: number = 0;
  loading: boolean = false;
  private _toastRecebido = new Subject<string>();
  toastValor: string = '';

  constructor(private contaService: ContaService, private clienteService: ClienteService, private cookieService: CookieService, @Inject(Router) private router: Router) {
    if (this.cookieService.get('clienteLogado')) {
      this.clienteService.consultarClienteConta(this.cookieService.get('clienteLogado'))
        .subscribe(
          response => {
            this.cliente = response.body;
          },
          error => {
alert("erro")
          }
        );
    } else {
      this.router.navigateByUrl('capgemini/login');
    }
  }

  depositar() {
    this.operacao = 1;
  }

  sacar() {
    this.operacao = 2;
  }

  confirmarOperacao() {
    if(this.valorOperacao > 0) {
      if(this.operacao == 1) {
        this.cliente.valor = this.valorOperacao;
        this.contaService.depositar(this.cliente)
        .subscribe(
          response => {
            this.loading = false;
            if(response.status == 200) {
              this.contaService.consultarSaldo(this.cliente.cpf)
              .subscribe(
                response => {
                  this.loading = false;
                  if(response.status == 200) {
                    this.cliente.conta.saldo = response.body;
                  }
                },
                error => {
                  this.loading = false;
                  this.isErro("requisicaoFalha")
                }
              );
            }
          },
          error => {
            this.loading = false;
            this.isErro("requisicaoFalha")
          }
        );
      } else {
        this.cliente.valor = this.valorOperacao;
        this.contaService.sacar(this.cliente)
        .subscribe(
          response => {
            this.loading = false;
            if(response.status == 200) {
              this.contaService.consultarSaldo(this.cliente.cpf)
              .subscribe(
                response => {
                  this.loading = false;
                  if(response.status == 200) {
                    this.cliente.conta.saldo = response.body;
                  }
                },
                error => {
                  this.loading = false;
                  this.isErro("requisicaoFalha")
                }
              );
            }
          },
          error => {
            this.loading = false;
            this.isErro("requisicaoFalha")
          }
        );
      }
    } else {
      alert("valor deve ser maior que 0")
    }
  }

  ngOnInit(): void {
    this._toastRecebido.subscribe((resposta) => this.toastValor = resposta);
    this._toastRecebido.pipe(debounceTime(8000)).subscribe(() => this.toastValor = '');
  }

  isErro(valor: string): void {
    this._toastRecebido.next(valor);
  }

}
