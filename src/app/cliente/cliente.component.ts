import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

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

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
  }

  cadastrarCliente() {
    if(this.nomeCompleto !== '' && this.cpf !== '' && this.senha !== '') {
      if(this.cpf.length == 11) {
        this.clienteService.cadastrarCliente(new Cliente(this.nomeCompleto, this.cpf, this.senha), this.loading, this.resposta);
      } else {
        alert('cpf11')
      }
    } else {
      alert('campoobrigatorio')
    }
  }

}
