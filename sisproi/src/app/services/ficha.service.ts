import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ParamService } from './param.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  private sectores = JSON.parse(localStorage.getItem('usuario')).sector as Array<string>;

  constructor(private http: HttpClient,
    private _param: ParamService) { }

  list(filtro) {
    const URL = env.URI_API.concat('ficha/');
    return this.http.post<any>(URL, filtro).pipe(
      map(res => {
        let estado_0 = res.data.find(f => f.estado === 0);
        let estado_1 = res.data.find(f => f.estado === 1);
        let estado_2 = res.data.find(f => f.estado === 2);

        if (estado_0) {
          for (let i = 0; i < estado_0.lista_fichas.length; i++) {
            let ficha = estado_0.lista_fichas[i];
            if (this.sectores.indexOf(ficha.sector_nivel_1) == -1) {
              estado_0.lista_fichas.splice(i, 1);
              i--;
            }
          }
        }

        if (estado_1) {
          for (let i = 0; i < estado_1.lista_fichas.length; i++) {
            let ficha = estado_1.lista_fichas[i];
            if (this.sectores.indexOf(ficha.sector_nivel_1) == -1) {
              estado_1.lista_fichas.splice(i, 1);
              i--;
            }
          }
        }

        if (estado_2) {
          for (let i = 0; i < estado_2.lista_fichas.length; i++) {
            let ficha = estado_2.lista_fichas[i];
            if (this.sectores.indexOf(ficha.sector_nivel_1) == -1) {
              estado_2.lista_fichas.splice(i, 1);
              i--;
            }
          }
        }

        return { estado_0, estado_1, estado_2 };
      })
    );
  }

  get(id) {
    const URL = env.URI_API.concat('ficha/select/', id);
    return this.http.get<any>(URL);
  }

  save(data) {
    const URL = env.URI_API.concat('ficha/', data._id ? 'update' : 'insert');
    return this.http.post<any>(URL, data);
  }

  report(id) {
    const URL = env.URI_API.concat('ficha/report/', id);
    return this.http.get<any>(URL);
  }

  csv(evalu: boolean) {
    let URL = env.URI_API.concat('ficha/reportCSV');
    return this.http.get<any>(URL).pipe(
      map(res => {
        if (evalu)
          for (let i = 0; i < res.data.length; i++) {
            let e = res.data[i];
            e.prio_politica_sect = this._param.prioridad(e.prio_politica_sect, true);
            e.riesgo_dis_tec = this._param.politica(e.riesgo_dis_tec, true);
            e.riesgo_dis_tec = this._param.politica(e.riesgo_dis_tec, true);
            e.riesgo_dis_tec = this._param.politica(e.riesgo_dis_tec, true);
            e.riesgo_dis_tec = this._param.politica(e.riesgo_dis_tec, true);
            e.riesgo_dis_tec = this._param.politica(e.riesgo_dis_tec, true);
            e.riesgo_dis_tec = this._param.politica(e.riesgo_dis_tec, true);
          }

        return res;
      })
    );
  }

  summary(sector: string) {
    const URL = env.URI_API.concat('ficha/estado/', sector);
    return this.http.get<any>(URL);
  }

}
