import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ParamService } from './param.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient,
    private _param: ParamService) { }

  list(filtro: any) {
    const URL = env.URI_API.concat('ficha/');
    return this.http.post<any>(URL, filtro).pipe(
      map(res => {
        let estado_0 = res.data.find(f => f.estado === 0);
        let estado_1 = res.data.find(f => f.estado === 1);
        let estado_2 = res.data.find(f => f.estado === 2);

        return { estado_0, estado_1, estado_2 };
      })
    );
  }

  get(id: string) {
    const URL = env.URI_API.concat('ficha/select/', id);
    return this.http.get<any>(URL);
  }

  save(data: any) {
    const URL = env.URI_API.concat('ficha/', data._id ? 'update' : 'insert');
    return this.http.post<any>(URL, data);
  }

  report(id: string) {
    const URL = env.URI_API.concat('ficha/report/', id);
    return this.http.get<any>(URL);
  }

  csv(filtro: any) {
    let URL = env.URI_API.concat('ficha/reportCSV');
    return this.http.post<any>(URL, filtro).pipe(
      map(res => {

        for (let i = 0; i < res.data.length; i++) {
          let e = res.data[i];
          let retorno = [];

          for (let j = 0; j < e.sector_nivel_2.length; j++) {
            if (e.sector_nivel_2[j]) {
              let sb = this._param.subSector(e.sector_nivel_1);
              retorno.push(this._param.aliasSubSector(sb, j));
            }
          }

          e.sector_nivel_2 = retorno.join(', ');
        }

        if (filtro.evaluacion)
          for (let i = 0; i < res.data.length; i++) {
            let e = res.data[i];
            e.prio_politica_sect = this._param.politica(e.prio_politica_sect, true);
            e.riesgo_dis_tec = this._param.riesgo(e.riesgo_dis_tec, true);
            e.riesgo_dis_deman = this._param.riesgo(e.riesgo_dis_deman, true);
            e.riesgo_socioamb = this._param.riesgo(e.riesgo_socioamb, true);
            e.riesgo_politico = this._param.riesgo(e.riesgo_politico, true);
            e.riesgo_institucional = this._param.riesgo(e.riesgo_institucional, true);
            e.riesgo_otros = this._param.riesgo(e.riesgo_otros, true);

            e.productiva_mineria = this._param.politica(e.productiva_mineria, true);
            e.productiva_agri = this._param.politica(e.productiva_agri, true);
            e.productiva_pesca = this._param.politica(e.productiva_pesca, true);
            e.productiva_indus = this._param.politica(e.productiva_indus, true);
            e.productiva_otros = this._param.politica(e.productiva_otros, true);
            e.social_trans = this._param.politica(e.social_trans, true);
            e.social_telco = this._param.politica(e.social_telco, true);
            e.social_agua = this._param.politica(e.social_agua, true);
            e.social_riego = this._param.politica(e.social_riego, true);
            e.social_educa = this._param.politica(e.social_educa, true);
            e.social_salud = this._param.politica(e.social_salud, true);
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
