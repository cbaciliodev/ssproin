import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }
  
  allPerfil(){
    let url = env.URI_API.concat('perfil');
    return this.http.get<any>(url)
  }

  crearPerfil(perfil: Perfil) {
    let url = env.URI_API.concat('perfil');
    return this.http.post(url, perfil)
  }
  delete(id){
    let url = env.URI_API.concat('perfil'+ `/${id}`);
    return this.http.delete<any>(url)
  }

}
