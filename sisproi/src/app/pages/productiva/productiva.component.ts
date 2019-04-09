import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapaUploadComponent } from 'src/app/components/mapa-upload/mapa-upload.component';
import { ProductivaService } from 'src/app/services/productiva.service';
import { environment as env } from 'src/environments/environment';
import { AccionService } from 'src/app/services/accion.service';
import { Parametro } from 'src/app/models/parametro.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-productiva',
  templateUrl: './productiva.component.html',
  styleUrls: ['./productiva.component.css']
})
export class ProductivaComponent implements OnInit {

  public saving = false;
  public viewMode = false;
  public productivaForm: FormGroup;

  private departamentos: Array<Parametro> = [];
  private tipo_proyecto: Array<Parametro> = [];
  private fuente_agua: Array<Parametro> = [];
  private etapa_avance: Array<Parametro> = [];
  private etapa_proceso: Array<Parametro> = [];

  private unsubscribe = new Subject<void>();

  @ViewChild('ubicacionGeografica') mapaUpload: MapaUploadComponent;

  constructor(private builder: FormBuilder,
    private route: ActivatedRoute,
    private _productiva: ProductivaService,
    public _accion: AccionService) { }

  ngOnInit() {
    this.configParametros();
    this.configFormulario();
    this.getProductiva();
  }

  private getProductiva() {
    this.route.data.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      if (res.productiva) {
        if (res.productiva.data)
          this.configProductiva(res.productiva.data);
      }
    });
  }

  private configProductiva(data) {
    this.productivaForm.addControl('_id', new FormControl(''));
    for (let i = 0; i < data.inversionista.length; i++)
      this.inversionistas.push(new FormControl(''));
    for (let i = 0; i < data.region.length; i++)
      this.regiones.push(this.builder.group({
        nombre: [''],
        alias: ['']
      }));

    this.productivaForm.patchValue(data);
    let ver = this.route.snapshot.queryParamMap.get('ver');
    if (ver) { this.productivaForm.disable(); this.viewMode = true; }
  }

  public guardar() {
    this.tiggerFields();
    if (this.productivaForm.invalid) return;

    this.saving = true;
    let productiva = this.productivaForm.value;
    productiva.ubicacion = this.mapaUpload.mapGenerated();

    this._productiva.save(productiva)
      .subscribe(
        res => {
          if (res.data.insert) this.afterSave(res.data.ficha._id);
          else swal('Atención', env.MSG.SUCCESS_UPDATE, 'success');
        }, _ => swal('Atención', env.MSG.ERROR_INSERT, 'error'),
        () => this.saving = false
      );
  }

  private tiggerFields() {
    Object.keys(this.productivaForm.controls).forEach(field => {
      let _control = this.control(field);
      if (_control instanceof FormControl)
        _control.markAsTouched({ onlySelf: true });
    });
  }

  private afterSave(id) {
    this.productivaForm.addControl('_id', new FormControl(id));
    swal('Atención', env.MSG.SUCCESS_INSERT, 'success');
  }

  public addInversion() {
    let valor = this.valor('inversion');
    this.inversionistas.push(new FormControl(valor));
    this.control('inversion').setValue('');
  }

  public addRegion(i) {
    if (!i) return;

    let region = this.departamentos[i];
    let exist = this.regiones.value.find(_r => _r.nombre === region.nombre);
    if (exist) return;

    this.regiones.push(this.builder.group({
      nombre: [region.nombre],
      alias: [region.alias]
    }));
  }

  public valor(field) { return this.productivaForm.get(field).value; }
  public control(field): AbstractControl { return this.productivaForm.get(field) };
  public invalid(field) { return this.productivaForm.get(field).invalid && this.productivaForm.get(field).touched; }

  get fuente_agua_array() { return this.productivaForm.get('fuente_agua') as FormArray }
  get inversionistas() { return this.productivaForm.get('inversionista') as FormArray }
  get regiones() { return this.productivaForm.get('region') as FormArray }

  private configFormulario() {
    this.productivaForm = this.builder.group({
      nombre_proyecto: ['', Validators.required],
      operador: [''],
      inversion: [''],
      inversionista: this.builder.array([]),
      departamento: [''],
      region: this.builder.array([]),
      ubicacion: [''],
      inversion_global: [0],
      inversion_ejecutada: [0],
      anio_contruccion: [''],
      anio_operacion: [''],
      tipo_proyecto: [''],
      tipo_yacimiento: [''],
      vida_util: [''],
      potencia_energia: [''],
      fuente_agua: this.builder.array([]),
      capacidad_agua: [''],
      produccion_anual: [''],
      etapa_avance: [''],
      observacion_avance: [''],
      impacto_ambiental: [''],
      observacion_ambiental: [''],
      actividad_explotacion: [''],
      observacion_explotacion: [''],
      concesion_beneficio: [''],
      observacion_beneficio: [''],
      dato_adicional: ['']
    });

    for (let i = 0; i < this.fuente_agua.length; i++) {
      this.fuente_agua_array.push(new FormControl(false));
    }
  }

  private configParametros() {
    this.departamentos = JSON.parse(localStorage.getItem(env.PARAMETRO.DEPARTAMENTO));
    this.tipo_proyecto = JSON.parse(localStorage.getItem(env.PARAMETRO.TIPO_PROYECTO));
    this.fuente_agua = JSON.parse(localStorage.getItem(env.PARAMETRO.FUENTE_AGUA));
    this.etapa_avance = JSON.parse(localStorage.getItem(env.PARAMETRO.ETAPA_AVANCE));
    this.etapa_proceso = JSON.parse(localStorage.getItem(env.PARAMETRO.ETAPA_PROCESO));
  }

}
