import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccionService {

  constructor() { }

  validate(v) {
    const accion = JSON.parse(localStorage.getItem('usuario')).accion;
    if(accion.find(_a => _a == v)) return true;

    return false;
  }

}
