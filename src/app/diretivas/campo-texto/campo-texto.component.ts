import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'campo-texto',
  templateUrl: './campo-texto.component.html',
  styleUrls: ['./campo-texto.component.css']
})
export class CampoTextoComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() tipo: any = null;
  @Input() placeholder: string = '';
  @Output() valor = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  preencherValor(evento) {
    this.valor.emit(evento);
  }

}
