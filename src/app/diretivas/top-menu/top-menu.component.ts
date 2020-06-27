import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  @Input() titulo = '';

  constructor() { }

  ngOnInit() {
  }

}
