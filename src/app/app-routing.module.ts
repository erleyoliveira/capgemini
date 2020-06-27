import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { ContaComponent } from "./conta/conta.component";

const routes: Routes = [
    { path: 'capgemini/login', component: LoginComponent },
    { path: 'capgemini/cadastrocliente', component: ClienteComponent },
    { path: 'capgemini/conta', component: ContaComponent },
    { path: '**', component: LoginComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  