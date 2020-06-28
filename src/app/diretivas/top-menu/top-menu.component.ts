import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  @Input() titulo = '';

  constructor(private cookieService: CookieService, @Inject(Router) private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.cookieService.delete('clienteLogado');
    this.router.navigateByUrl('capgemini/login');
  }

}
