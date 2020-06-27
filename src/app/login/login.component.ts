import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string = '';
  loading: boolean = false;
  resposta: number = null;
  cpf: number = null;
  senha: string = '';

  constructor(private loginService: LoginService, @Inject(Router) private router: Router) { }

  ngOnInit() {
  }

  logar() {
    if(this.cpf !== null && this.senha !== '') {
      this.loginService.logar(this.cpf, this.senha, this.loading, this.resposta)
    } else {
      this.mensagem = 'camposObrigatorios';
    }
  }

  incluirCliente() {
    this.router.navigateByUrl('capgemini/cadastrocliente');
  }

}
