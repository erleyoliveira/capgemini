import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  resposta: number = null;
  cpf: string = '';
  senha: string = '';

  constructor(private loginService: LoginService, private cookieService: CookieService, @Inject(Router) private router: Router) { }

  ngOnInit() {
  }

  logar() {
    if(this.cpf !== '' && this.senha !== '') {
      this.loading = true;
      this.loginService.logar(this.cpf, this.senha)
      .subscribe(
        response => {
          this.loading = false;
          this.resposta = response.status;
          if(this.resposta == 200) {
            this.cookieService.set('clienteLogado', this.cpf);
            this.router.navigateByUrl('capgemini/conta');
          }
        },
        error => {
          this.loading = false;
          this.resposta = error.status;
        }
      );
    } else {
      this.resposta = -1;
    }
  }

  incluirCliente() {
    this.router.navigateByUrl('capgemini/cadastrocliente');
  }

}
