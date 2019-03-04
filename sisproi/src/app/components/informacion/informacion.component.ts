import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';
import { } from 'googlemaps';
import { MapaUploadComponent } from '../mapa-upload/mapa-upload.component';

@Component({
  selector: 'ficha-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  @Input() public fichaForm: FormGroup;
  @Input() public dataMapa = '';
  @ViewChild('gmap') gmapElement: ElementRef;

  @ViewChild('mapaUpload') mapaUpload: MapaUploadComponent;

  private map: google.maps.Map;
  private marker: google.maps.Marker;

  private nivel_1: Array<Parametro> = [];
  private nivel_trans_2: Array<Parametro> = [];
  private nivel_trans_3: Array<Parametro> = [];
  private nivel_agua_2: Array<Parametro> = [];
  private nivel_agua_3: Array<Parametro> = [];
  private nivel_energia_2: Array<Parametro> = [];
  private nivel_energia_3: Array<Parametro> = [];
  private nivel_energia_4: Array<Parametro> = [];
  private nivel_telecom_2: Array<Parametro> = [];
  private nivel_telecom_3: Array<Parametro> = [];
  private nivel_riego_2: Array<Parametro> = [];
  private jurisdiccion: Array<Parametro> = [];
  private prioridad_sector: Array<Parametro> = [];
  private modalidad_ejecutiva: Array<Parametro> = [];
  private nivel_avance: Array<Parametro> = [];
  private departamento: Array<Parametro> = [];

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.configParametros();
  }

  public onChangeNivel1() {
    while (this.sector_nivel_2.length !== 0) this.sector_nivel_2.removeAt(0);
    while (this.sector_nivel_3.length !== 0) this.sector_nivel_3.removeAt(0);
    while (this.sector_nivel_4.length !== 0) this.sector_nivel_4.removeAt(0);

    if (this.valor('sector_nivel_1') == 'PTRANSPORTE') {
      for (let i = 0; i < this.nivel_trans_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
      for (let i = 0; i < this.nivel_trans_3.length; i++) this.sector_nivel_3.push(new FormControl(false));
    } else if (this.valor('sector_nivel_1') == 'PAGUA_SANEA') {
      for (let i = 0; i < this.nivel_agua_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
      for (let i = 0; i < this.nivel_agua_3.length; i++) this.sector_nivel_3.push(new FormControl(false));
    } else if (this.valor('sector_nivel_1') == 'PENERGIA') {
      for (let i = 0; i < this.nivel_energia_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
      for (let i = 0; i < this.nivel_energia_3.length; i++) this.sector_nivel_3.push(new FormControl(false));
      for (let i = 0; i < this.nivel_energia_4.length; i++) this.sector_nivel_4.push(new FormControl(false));
    } else if (this.valor('sector_nivel_1') == 'PTELECOMUNIC') {
      for (let i = 0; i < this.nivel_telecom_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
      for (let i = 0; i < this.nivel_telecom_3.length; i++) this.sector_nivel_3.push(new FormControl(false));
    } else if (this.valor('sector_nivel_1') == 'PRIEGO') {
      for (let i = 0; i < this.nivel_riego_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
    }
  }

  public changeDepartamento(i) {
    if (!i) return;

    let dep = this.departamento[i];
    let exist = this.departamentos.value.find(d => d.nombre === dep.nombre);
    if (exist) return;

    this.departamentos.push(this.builder.group({
      nombre: [dep.nombre],
      alias: [dep.alias]
    }));
  }

  public removeDepart(i) {
    if(this.valor('estado_registro') == 2) return;
    this.departamentos.removeAt(i);
  }

  public valor(field) { return this.fichaForm.get(field).value; }
  public control(field): AbstractControl { return this.fichaForm.get(field) };
  public invalid(field) { return this.fichaForm.get(field).invalid && this.fichaForm.get(field).touched; }

  get sector_nivel_2() { return this.fichaForm.get('sector_nivel_2') as FormArray }
  get sector_nivel_3() { return this.fichaForm.get('sector_nivel_3') as FormArray }
  get sector_nivel_4() { return this.fichaForm.get('sector_nivel_4') as FormArray }
  get departamentos() { return this.fichaForm.get('departamento') as FormArray }

  private configParametros() {
    this.nivel_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
    this.nivel_trans_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_2));
    this.nivel_trans_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_3));
    this.nivel_agua_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_2));
    this.nivel_agua_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_3));
    this.nivel_energia_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_ENERGIA_2));
    this.nivel_energia_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_ENERGIA_3));
    this.nivel_energia_4 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_ENERGIA_4));
    this.nivel_telecom_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TELECOM_2));
    this.nivel_telecom_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TELECOM_3));
    this.nivel_riego_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_RIEGO_2));
    this.jurisdiccion = JSON.parse(localStorage.getItem(env.PARAMETRO.JURISDICCION));
    this.prioridad_sector = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD));
    this.modalidad_ejecutiva = JSON.parse(localStorage.getItem(env.PARAMETRO.MODALIDAD_EJECU));
    this.nivel_avance = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AVANCE));
    this.departamento = JSON.parse(localStorage.getItem(env.PARAMETRO.DEPARTAMENTO));
  }

  getDataMapUpload() {
    return this.mapaUpload.mapGenerated();
  }
}
