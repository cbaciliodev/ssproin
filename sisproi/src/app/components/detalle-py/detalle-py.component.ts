import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-py',
  templateUrl: './detalle-py.component.html',
  styleUrls: ['./detalle-py.component.css']
})
export class DetallePyComponent implements OnInit {
  @Input() titulo: string;
  @Input() proyectos = 0;
  @Input() recibidos = 0;
  @Input() evaluados = 0;

  recibidosPrc = '0';
  evaluadosPrc = '0';

  constructor() {}

  ngOnInit() {
    if (this.proyectos !== 0) {
      this.recibidosPrc =  (this.recibidos / this.proyectos * 100).toFixed() + '%' ;
      this.evaluadosPrc = (this.evaluados / this.proyectos * 100).toFixed() + '%';
    }
  }
}
