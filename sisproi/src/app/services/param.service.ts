import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  private nivel_1 = this.getLocalItem(env.PARAMETRO.NIVEL_1);
  private prioridad_sector = this.getLocalItem(env.PARAMETRO.PRIORIDAD_SECTOR);
  private modalidad_ejecutiva = this.getLocalItem(env.PARAMETRO.MODALIDAD_EJECU);
  private nivel_avance = this.getLocalItem(env.PARAMETRO.NIVEL_AVANCE);
  private prioridad_riesgo = this.getLocalItem(env.PARAMETRO.PRIORIDAD_RIESGO);
  private prioridad_politica = this.getLocalItem(env.PARAMETRO.PRIORIDAD_POLITICA);

  constructor() { }

  sector(nombre: string) {
    if (!nombre) return 'No registrada';
    return this.alias(this.nivel_1.find(_p => _p.nombre == nombre));
  }

  prioridad(nombre: string) {
    if (!nombre) return 'No registrada';
    return this.alias(this.prioridad_sector.find(_p => _p.nombre == nombre));
  }

  ejecutiva(nombre: string) {
    if (!nombre) return 'No registrada';
    return this.alias(this.modalidad_ejecutiva.find(_p => _p.nombre == nombre));
  }

  avance(nombre: string) {
    if (!nombre) return 'No registrada';
    return this.alias(this.nivel_avance.find(_p => _p.nombre == nombre));
  }

  departamentos(depas: any[]) {
    if (depas.length <= 0) return 'No registrada';
    return depas.map(_d => _d.alias).join(', ');
  }

  riesgo(nombre: string) {
    if (!nombre) return 'No registrada';
    return this.alias(this.prioridad_riesgo.find(_p => _p.nombre == nombre));
  }

  politica(nombre: string) {
    if (!nombre) return 'No registrada';
    let alias: string = this.alias(this.prioridad_politica.find(_p => _p.nombre == nombre))
    return alias.toUpperCase();
  }

  alias(parametro: any) {
    if (!parametro) return 'No registrada';
    return parametro.alias;
  }

  empty(field: string) {
    if (!field) return 'No registrada';
    return field;
  }

  private getLocalItem(item: string) {
    let retorno = JSON.parse(localStorage.getItem(item));
    return retorno ? retorno : [];
  }

}
