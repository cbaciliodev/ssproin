import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient) { }

  list(filtro) {
    let URL = env.URI_API.concat('ficha/');
    return this.http.post<any>(URL, filtro).pipe(
      map(res => {
        let estado_0 = res.data.find(f => f.estado === 0);
        let estado_1 = res.data.find(f => f.estado === 1);
        let estado_2 = res.data.find(f => f.estado === 2);

        return { estado_0, estado_1, estado_2 };
      })
    );
  }

  get(id) {
    let URL = env.URI_API.concat('ficha/select/', id);
    return this.http.get<any>(URL);
  }

  save(data) {
    let URL = env.URI_API.concat('ficha/', data._id ? 'update' : 'insert');
    return this.http.post<any>(URL, data);
  }

  report(id) {
    let URL = env.URI_API.concat('ficha/report/', id);
    return this.http.get<any>(URL);
  }

}
