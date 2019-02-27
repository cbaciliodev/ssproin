import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';
import { FormGroup } from '@angular/forms';
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

  constructor() { }

  ngOnInit() {
    this.configParametros();
  }

  public valor(field) {
    return this.fichaForm.get(field).value;
  }

  public invalid(field) {
    return this.fichaForm.get(field).invalid && this.fichaForm.get(field).touched;
  }

  private configParametros() {
    this.jurisdiccion = JSON.parse(localStorage.getItem(env.PARAMETRO.JURISDICCION));
    this.prioridad_sector = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD_SECTOR));
    this.modalidad_ejecutiva = JSON.parse(localStorage.getItem(env.PARAMETRO.MODALIDAD_EJECU));
    this.nivel_avance = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AVANCE));
  }

}
