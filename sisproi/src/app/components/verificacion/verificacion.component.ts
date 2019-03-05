import { Component, OnInit, Input } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';
import { FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'ficha-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  @Input() public registradaForm: FormGroup;

  private prioridad: Array<Parametro> = [];
  private prioridad_politica: Array<Parametro> = [];

  constructor() { }

  ngOnInit() {
    this.configParametros();
  }

  public valor(field) {
    return this.registradaForm.get(field).value;
  }

  private configParametros() {
    this.prioridad = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD));
    this.prioridad_politica = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD_POLITICA));
  }

}
