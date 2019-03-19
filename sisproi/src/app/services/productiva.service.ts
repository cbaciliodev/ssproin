import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductivaService {

  constructor(private http: HttpClient) { }

  list(filtro: any) {
    let URL = env.URI_API.concat('productiva/');
    return this.http.post<any>(URL, filtro);
  }

  get(id: string) {
    let URL = env.URI_API.concat('productiva/select/', id);
    return this.http.get<any>(URL);
  }

  save(data: any) {
    let URL = env.URI_API.concat('productiva/', data._id ? 'update' : 'insert');
    return this.http.post<any>(URL, data);
  }

  delete(id: string) {
    let URL = env.URI_API.concat('productiva/delete/', id);
    return this.http.get<any>(URL);
  }

}
