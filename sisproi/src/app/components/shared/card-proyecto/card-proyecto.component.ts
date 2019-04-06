import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-proyecto',
  templateUrl: './card-proyecto.component.html',
  styles: []
})
export class CardProyectoComponent implements OnInit {

  @Input() titulo = '14 Jun';
  @Input() subtitulo = 'Pendiente';
  @Input() css = 'text-danger';
  @Input() icon = 'mdi-alert-circle';

  constructor() { }

  ngOnInit() {
  }

}
