import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }
  
  allPerfil(){
    let url = env.URI_API.concat('perfil');
    return this.http.get<any>(url)
  }

}
