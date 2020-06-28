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
  loading: boolean = false;
  private _toastRecebido = new Subject<string>();
  toastValor: string = '';

  constructor(private contaService: ContaService, private clienteService: ClienteService, private cookieService: CookieService, @Inject(Router) private router: Router) {
    if (this.cookieService.get('clienteLogado')) {
      this.clienteService.consultarClienteConta(this.cookieService.get('clienteLogado'))
        .subscribe(
          response => {
            this.cliente = response.body;
            this.cliente.conta.saldo = Math.ceil(this.cliente.conta.saldo);
          },
          error => {
            this.isErro('erroBuscarClienteLogado')
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
    if(this.cliente.valor > 0) {
      this.loading = true;
      if(this.operacao == 1) {
        this.contaService.depositar(this.cliente)
        .subscribe(
          response => {
            this.loading = false;
            if(response.status == 200) {
              this.isErro('depositoSucesso');
              this.loading = true;
              this.contaService.consultarSaldo(this.cliente.cpf)
              .subscribe(
                response => {
                  this.loading = false;
                  if(response.status == 200) {
                    this.cliente.conta.saldo = response.body;
                    this.cliente.conta.saldo = this.cliente.conta.saldo.toFixed(2);
                  }
                },
                error => {
                  this.loading = false;
                  this.isErro('requisicaoFalha')
                }
              );
            }
          },
          error => {
            this.loading = false;
            this.isErro('requisicaoFalha')
          }
        );
      } else {
        if(this.cliente.conta.saldo >= this.cliente.valor) {
          this.contaService.sacar(this.cliente)
          .subscribe(
            response => {
              this.loading = false;
              if(response.status == 200) {
                this.isErro('saqueSucesso');
                this.loading = true;
                this.contaService.consultarSaldo(this.cliente.cpf)
                .subscribe(
                  response => {
                    this.loading = false;
                    if(response.status == 200) {
                      this.cliente.conta.saldo = response.body;
                      this.cliente.conta.saldo = this.cliente.conta.saldo.toFixed(2);
                    }
                  },
                  error => {
                    this.loading = false;
                    this.isErro('requisicaoFalha')
                  }
                );
              }
            },
            error => {
              this.loading = false;
              this.isErro('requisicaoFalha')
            }
          );
        } else {
          this.loading = false;
          this.isErro('saldoInsuficiente')
        }
      }
    } else {
      this.isErro('valorMaiorZero')
    }
  }

  ngOnInit(): void {
    this._toastRecebido.subscribe((resposta) => this.toastValor = resposta);
    this._toastRecebido.pipe(debounceTime(8000)).subscribe(() => this.toastValor = '');
  }

  isErro(valor: string): void {
    this._toastRecebido.next(valor);
  }

  setarValorOperacao(evento) {
    if(evento.includes('R$')) {
      evento = evento.substring(3, evento.length).replace('.', '');
    }
    while(evento.includes('.')) {
      evento = evento.replace('.', '');
    }
    this.cliente.valor = Number.parseFloat(evento.replace(',', '.'));
  }

}
