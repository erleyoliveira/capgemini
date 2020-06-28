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
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ContaService } from './conta/conta.service';
import { NgxCurrencyModule } from "ngx-currency";

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

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
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(204, 204, 204, 0.2)',
      primaryColour: '#00559d',
      secondaryColour: '#0070ad'
    }),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [
    CookieService,
    LoginService,
    ClienteService,
    ContaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
