import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { FichaService } from 'src/app/services/ficha.service';
import { AccionService } from 'src/app/services/accion.service';
import { Parametro } from 'src/app/models/parametro.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import swal from 'sweetalert';
import { FichaComponent } from '../ficha/ficha.component';

@Component({
  selector: 'ficha-registrada',
  templateUrl: './registrada.component.html',
  styleUrls: ['./registrada.component.css']
})
export class RegistradaComponent implements OnInit, OnDestroy {

  @ViewChild('fichaInformacion') fichaInformacion: FichaComponent;

  public saving = false;
  public processing = false;
  public fichaForm: FormGroup;
  public registradaForm: FormGroup;

  private nivel_trans_2: Array<Parametro> = [];
  private nivel_agua_2: Array<Parametro> = [];
  private nivel_energia_2: Array<Parametro> = [];
  private nivel_telecom_2: Array<Parametro> = [];
  private nivel_riego_2: Array<Parametro> = [];
  private nivel_salud_2: Array<Parametro> = [];
  private nivel_educacion_2: Array<Parametro> = [];

  private unsubscribe = new Subject<void>();

  constructor(private builder: FormBuilder,
    private route: ActivatedRoute,
    private _ficha: FichaService,
    public _accion: AccionService) { }

  ngOnInit() {
    this.configParametros();
    this.configFormulario();
    this.getFicha();
  }

  private getFicha() {
    this.route.data.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      if (res.ficha) {
        if (res.ficha.data)
          this.configFicha(res.ficha.data);
      }
    });
  }

  private configFicha(ficha) {
    this.fichaForm.patchValue({ sector_nivel_1: ficha.sector_nivel_1 });
    this.createDepartamentos(ficha.departamento); this.createSectores();
    this.fichaForm.patchValue(ficha);
    this.registradaForm.patchValue(ficha);

    if (ficha.estado_evaluacion == 2) {
      this.fichaForm.disable();
      this.registradaForm.disable();
    }
  }

  public guardar() {
    if (this.fichaForm.invalid || this.registradaForm.invalid) return;

    this.beforeSave();
    let ficha = this.fichaForm.value;

    ficha.localizacion_latitud = this.fichaInformacion.getMapaData().ubicacion;
    ficha.area_influencia = this.fichaInformacion.getMapaData().area_influencia;

    Object.assign(ficha, this.registradaForm.value);

    this._ficha.save(ficha)
      .subscribe(
        _ => swal('Atención', env.MSG.SUCCESS_UPDATE, 'success'),
        _ => swal('Atención', env.MSG.ERROR_INSERT, 'error'),
        () => this.saving = false);
  }

  public procesar() {
    swal({
      title: 'Estas seguro?',
      text: env.MSG.WARN_PROCESS,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true
    }).then(res => {
      if (res) {
        this.beforeProcess();
        this._ficha.save(this.registradaForm.value)
          .subscribe(
            _ => this.afterProcess(),
            _ => swal('Atención', env.MSG.ERROR_PROCESS, 'error'),
            () => this.processing = false);
      }
    });
  }

  private beforeSave() {
    this.saving = true;
    if (this.registada('estado_evaluacion') == 0)
      this.control('fecha_inicio_eval').setValue(Date.now());
    else this.control('fecha_actual_eval').setValue(Date.now());

    this.control('estado_evaluacion').setValue(1);
    this.control('usuario_eval').setValue(this.usuario);
  }

  private beforeProcess() {
    this.processing = true;
    this.control('estado_evaluacion').setValue(2);
    this.control('fecha_final_eval').setValue(Date.now());
    this.control('usuario_eval').setValue(this.usuario);
  }

  private afterProcess() {
    swal('Atención', env.MSG.SUCCESS_PROCESS, 'success');
    this.fichaForm.disable();
    this.registradaForm.disable();
  }

  public createSectores() {
    if (this.registro('sector_nivel_1') == 'PTRANSPORTE') {
      for (let i = 0; i < this.nivel_trans_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    } else if (this.registro('sector_nivel_1') == 'PAGUA_SANEA') {
      for (let i = 0; i < this.nivel_agua_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    } else if (this.registro('sector_nivel_1') == 'PENERGIA') {
      for (let i = 0; i < this.nivel_energia_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    } else if (this.registro('sector_nivel_1') == 'PTELECOMUNIC') {
      for (let i = 0; i < this.nivel_telecom_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    } else if (this.registro('sector_nivel_1') == 'PRIEGO') {
      for (let i = 0; i < this.nivel_riego_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    } else if (this.registro('sector_nivel_1') == 'PSALUD') {
      for (let i = 0; i < this.nivel_salud_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    } else if (this.registro('sector_nivel_1') == 'PEDUCACION') {
      for (let i = 0; i < this.nivel_educacion_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    }
  }

  private createDepartamentos(depas) {
    for (let i = 0; i < depas.length; i++) {
      this.departamento.push(this.builder.group({
        nombre: [''],
        alias: ['']
      }));
    }
  }

  public registro(field) { return this.fichaForm.get(field).value; }
  public registada(field) { return this.registradaForm.get(field).value; }
  public control(field): AbstractControl { return this.registradaForm.get(field) };

  get sector_nivel_2() { return this.fichaForm.get('sector_nivel_2') as FormArray }
  get departamento() { return this.fichaForm.get('departamento') as FormArray }
  get usuario() { return JSON.parse(localStorage.getItem('usuario'))._id }

  private configFormulario() {
    this.fichaForm = this.builder.group({
      sector_nivel_1: ['', Validators.required],
      sector_nivel_2: this.builder.array([]),
      jurisdiccion: ['', Validators.required],
      jurisdiccion_otro: [''],
      nombre_programa: [''],
      descripcion_programa: [''],
      nombre_proyecto: ['', Validators.required],
      descripcion_proyecto: [''],
      monto_estimado: [0],
      prioridad_sector: [''],
      comentarios_prioridad_sector: [''],
      modalidad_ejecutiva: [''],
      modalidad_ejecutiva_otra: [''],
      nivel_avance: [''],
      nivel_avance_fisico: [],
      nivel_avance_financiero: [],
      nivel_avance_observacion: [''],
      anio_inicio_posible: [''],
      anio_puesta_operacion: [''],
      departamento: this.builder.array([]),
      select_departamento: [''],
      localizacion_latitud: [''],
      localizacion_longitud: [''],
      area_influencia: [''],
      archivo_adicional: [''],
      filename_adicional: [''],
      comentarios: [''],
      estado_registro: [0],
      estado_evaluacion: [],
    });

    this.registradaForm = this.builder.group({
      _id: [''],
      prio_politica_sect: [''],
      prio_politica_sect_comentario: [''],
      riesgo_dis_tec: [''],
      riesgo_dis_tec_comentario: [''],
      riesgo_dis_deman: [''],
      riesgo_dis_deman_comentario: [''],
      riesgo_socioamb: [''],
      riesgo_socioamb_comentario: [''],
      riesgo_politico: [''],
      riesgo_politico_comentario: [''],
      riesgo_institucional: [''],
      riesgo_institucional_comentario: [''],
      riesgo_otros: [''],
      riesgo_otros_comentario: [''],
      productiva_mineria: [''],
      productiva_mineria_comentario: [''],
      productiva_agri: [''],
      productiva_agri_comentario: [''],
      productiva_pesca: [''],
      productiva_pesca_comentario: [''],
      productiva_indus: [''],
      productiva_indus_comentario: [''],
      productiva_otros: [''],
      productiva_otros_comentario: [''],
      social_trans: [''],
      social_trans_comentario: [''],
      social_telco: [''],
      social_telco_comentario: [''],
      social_agua: [''],
      social_agua_comentario: [''],
      social_riego: [''],
      social_riego_comentario: [''],
      social_educa: [''],
      social_educa_comentario: [''],
      social_salud: [''],
      social_salud_comentario: [''],
      sintesis_evaluacion: [''],
      estado_evaluacion: [0],
      usuario_eval: [this.usuario],
      fecha_inicio_eval: [''],
      fecha_actual_eval: [''],
      fecha_final_eval: ['']
    });
  }

  private configParametros() {
    this.nivel_trans_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_2));
    this.nivel_agua_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_2));
    this.nivel_energia_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_ENERGIA_2));
    this.nivel_telecom_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TELECOM_2));
    this.nivel_riego_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_RIEGO_2));
    this.nivel_salud_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_SALUD_2));
    this.nivel_educacion_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_EDUCACION_2));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
