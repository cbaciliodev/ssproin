import { Component, OnInit, Input } from '@angular/core';
import { environment as env } from 'src/environments/environment';

const URL = env.URI_API.concat('files/');

@Component({
  selector: 'app-card-proyecto',
  templateUrl: './card-proyecto.component.html',
  styles: []
})
export class CardProyectoComponent implements OnInit {

  @Input() titulo = '-';
  @Input() css = 'text-danger';
  @Input() icon = 'mdi-alert-circle';
  @Input() href = '';

  disabled = 'disabled';

  constructor() { }

  ngOnInit() {

    if ( this.href !== '' ) {
      this.disabled = '';
      this.href = URL.concat( this.href );
    }

  }

}
