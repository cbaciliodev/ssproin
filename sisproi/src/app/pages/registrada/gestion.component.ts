import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { AccionService } from 'src/app/services/accion.service';
import { environment as env } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Parametro } from 'src/app/models/parametro.model';
import swal from 'sweetalert';

@Component({
  selector: 'gestion-registradas',
  templateUrl: './gestion.component.html'
})
export class GestionRComponent implements OnInit {

  public loading = false;
  public fichas_registradas: Array<any> = [];
  public fichas_evaluacion: Array<any> = [];
  public fichas_evaluadas: Array<any> = [];

  public filtroForm: FormGroup;
  public sector_1: Array<Parametro> = [];

  constructor(private builder: FormBuilder,
    private _fichas: FichaService,
    public _accion: AccionService) { }

  ngOnInit() {
    this.configParametros();
    this.configFiltro();
    this.getFichas();
  }

  public getFichas() {
    this.loading = true;
    this.fichas_registradas = [];
    this.fichas_evaluacion = [];
    this.fichas_evaluadas = [];

    this._fichas.list(this.filtro)
      .subscribe(
        res => {
          if (res.estado_0) this.fichas_registradas = res.estado_0.lista_fichas;
          if (res.estado_1) this.fichas_evaluacion = res.estado_1.lista_fichas;
          if (res.estado_2) this.fichas_evaluadas = res.estado_2.lista_fichas;
        }, _ => swal('Atención', env.MSG.ERROR_LIST, 'error'),
        () => this.loading = false
      );
  }

  get filtro() {
    return this.filtroForm.value;
  }

  private configFiltro() {
    this.filtroForm = this.builder.group({
      tipo: ['estado_evaluacion'],
      sector_nivel_1: [''],
      nombre_programa: [''],
      nombre_proyecto: ['']
    });
  }

  private configParametros() {
    this.sector_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
  }

}
