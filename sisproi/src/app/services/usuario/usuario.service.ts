import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  estaLogeado() {
    return this.token ? true : false;
  }

  asignarToken() {
    this.token = localStorage.getItem('token');
  }

  //servicio para consultar usuario
  login(usuario: Usuario, recordar: boolean = false) {
    let url = env.URI_API.concat('login');
    return this.http.post<any>(url, usuario)

  }

  //servicio para crear usuario
  crearUsuario(usuario: Usuario) {
    let url = env.URI_API.concat('usuario');
    return this.http.post(url, usuario)
  }




}
