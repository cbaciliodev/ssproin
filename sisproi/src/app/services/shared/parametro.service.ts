import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient) { }

  list() {
    let URL = env.URI_API.concat('parametro/');
    return this.http.get<any>(URL);
  }
}
