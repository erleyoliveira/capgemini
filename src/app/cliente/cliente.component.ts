import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  nomeCompleto: string = '';
  cpf: number = null;
  senha: string = '';
  loading: boolean = false;
  resposta: number = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
  }

  cadastrarCliente() {
    if(this.nomeCompleto !== '' && this.cpf !== null && this.senha !== '') {
      this.clienteService.cadastrarCliente(this.nomeCompleto, this.cpf, this.senha, this.loading, this.resposta);
    } else {
      alert('campoobrigatorio')
    }
  }

}
