import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { } from 'googlemaps';

@Component({
  selector: 'ficha-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  @Input() public fichaForm: FormGroup;
  @ViewChild('gmap') gmapElement: ElementRef;

  private map: google.maps.Map;
  private marker: google.maps.Marker;

  private jurisdiccion: Array<Parametro> = [];
  private prioridad_sector: Array<Parametro> = [];
  private modalidad_ejecutiva: Array<Parametro> = [];
  private nivel_avance: Array<Parametro> = [];
  private departamento: Array<Parametro> = [];
  private meses: Array<Parametro> = [];

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.configParametros();
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
    this.departamentos.removeAt(i);
  }

  public valor(field) {
    return this.fichaForm.get(field).value;
  }

  public invalid(field) {
    return this.fichaForm.get(field).invalid && this.fichaForm.get(field).touched;
  }

  get departamentos() { return this.fichaForm.get('departamento') as FormArray }

  private configParametros() {
    this.jurisdiccion = JSON.parse(localStorage.getItem(env.PARAMETRO.JURISDICCION));
    this.prioridad_sector = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD_SECTOR));
    this.modalidad_ejecutiva = JSON.parse(localStorage.getItem(env.PARAMETRO.MODALIDAD_EJECU));
    this.nivel_avance = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AVANCE));
    this.departamento = JSON.parse(localStorage.getItem(env.PARAMETRO.DEPARTAMENTO));
    this.meses = JSON.parse(localStorage.getItem(env.PARAMETRO.MES));
  }

}
