import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient) { }

  get(id) {
    let URL = env.URI_API.concat('ficha/select/', id);
    return this.http.get<any>(URL);
  }

  save(data) {
    let URL = env.URI_API.concat('ficha/', data._id? 'update': 'insert');
    return this.http.post<any>(URL, data);
  }
}
