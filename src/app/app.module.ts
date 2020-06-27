import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContaComponent } from './conta/conta.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CampoTextoComponent } from './diretivas/campo-texto/campo-texto.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login/login.service';
import { TopMenuComponent } from './diretivas/top-menu/top-menu.component';
import { ClienteService } from './cliente/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContaComponent,
    ClienteComponent,
    CampoTextoComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    LoginService,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
