import { Component, OnInit, Inject } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  nomeCompleto: string = '';
  cpf: string = '';
  senha: string = '';
  loading: boolean = false;
  resposta: number = null;
  private _toastRecebido = new Subject<string>();
  toastValor: string = '';

  constructor(private clienteService: ClienteService, @Inject(Router) private router: Router) { }

  cadastrarCliente() {
    if(this.nomeCompleto !== '' && this.cpf !== '' && this.senha !== '') {
      if(this.cpf.length == 11) {
        this.loading = true;
        this.clienteService.cadastrarCliente(new Cliente(this.nomeCompleto, this.cpf, this.senha))
          .subscribe(
            response => {
              this.loading = false;
              if(response.status == 200) {
                this.isErro("requisicaoEnviada")
              }
            },
            error => {
              this.loading = false;
              this.isErro("requisicaoFalha")
            }
          );
      } else {
        this.isErro('cpf11');
      }
    } else {
      this.isErro('campoObrigatorio')
    }
  }

  voltarParaLogin() {
    this.router.navigateByUrl("capgemini/login");
  }

  ngOnInit(): void {
    this._toastRecebido.subscribe((resposta) => this.toastValor = resposta);
    this._toastRecebido.pipe(debounceTime(8000)).subscribe(() => this.toastValor = '');
  }

  isErro(valor: string): void {
    this._toastRecebido.next(valor);
  }

}
