import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';

@Component({
  selector: 'ficha-proyecto',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public fichaForm: FormGroup;

  private nivel_1: Array<Parametro> = [];
  private nivel_trans_2: Array<Parametro> = [];
  private nivel_trans_3: Array<Parametro> = [];
  private nivel_agua_2: Array<Parametro> = [];
  private nivel_agua_3: Array<Parametro> = [];

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.configFormulario();
    this.configParametros();
  }

  public guardar() {
    console.log(this.fichaForm.value);
  }

  public valor(field) {
    return this.fichaForm.get(field).value;
  }

  private configFormulario() {
    this.fichaForm = this.builder.group({
      sector_nivel_1: ['', Validators.required],
      sector_nivel_2: this.builder.array([]),
      sector_nivel_3: ['', Validators.required],
      jurisdiccion: ['', Validators.required],
      jurisdiccion_otro: ['', Validators.required],
      nombre_proyecto: ['', Validators.required],
      descripcion: [''],
      monto_estimado: [0],
      prioridad_sector: [''],
      comentarios_prioridad_sector: [''],
      modalidad_ejecutiva: [''],
      modalidad_ejecutiva_otra: [''],
      nivel_avance: [''],
      nivel_avance_fisico: [0],
      nivel_avance_financiero: [0],
      anio_inicio_posible: [''],
      meses_ejecucion: [''],
      departamento: [''],
      localizacion_latitud: [''],
      localizacion_longitud: [''],
      area_influencia: ['']
    });
  }

  private configParametros() {
    this.nivel_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
    this.nivel_trans_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_2));
    this.nivel_trans_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_3));
    this.nivel_agua_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_2));
    this.nivel_agua_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_3));
  }

}
