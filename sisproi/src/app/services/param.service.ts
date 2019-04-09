import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  private nivel_1 = this.getLocalItem(env.PARAMETRO.NIVEL_1);
  private jurisdiccion_list = this.getLocalItem(env.PARAMETRO.JURISDICCION);
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

  jurisdiccion(nombre: string) {
    if (!nombre) return 'No registrada';
    return this.alias(this.jurisdiccion_list.find(_p => _p.nombre == nombre));
  }

  aliasSubSector(subSector: string, i) {
    let sb = this.getLocalItem(subSector);
    return this.alias(sb[i], true);
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

  riesgo(nombre: string, csv?: boolean) {
    if (!nombre) return csv ? '' : 'No registrada';
    return this.alias(this.prioridad_riesgo.find(_p => _p.nombre == nombre), csv);
  }

  politica(nombre: string, csv?: boolean) {
    if (!nombre) return csv ? '' : 'No registrada';
    let alias: string = this.alias(this.prioridad_politica.find(_p => _p.nombre == nombre))
    return alias.toUpperCase();
  }

  subSector(sector: string) {
    if (sector == 'PTRANSPORTE') return env.PARAMETRO.NIVEL_TRANS_2;
    else if (sector == 'PAGUA_SANEA') return env.PARAMETRO.NIVEL_AGUA_2;
    else if (sector == 'PENERGIA') return env.PARAMETRO.NIVEL_ENERGIA_2;
    else if (sector == 'PTELECOMUNIC') return env.PARAMETRO.NIVEL_TELECOM_2;
    else if (sector == 'PRIEGO') return env.PARAMETRO.NIVEL_RIEGO_2;
    else if (sector == 'PSALUD') return env.PARAMETRO.NIVEL_SALUD_2;
    else if (sector == 'PEDUCACION') return env.PARAMETRO.NIVEL_EDUCACION_2;
  }

  alias(parametro: any, csv?: boolean) {
    if (!parametro) return csv ? '' : 'No registrada';
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
