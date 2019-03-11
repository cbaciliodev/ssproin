import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  userLogin(): Usuario {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  estaLogeado() {
    return localStorage.getItem('token') ? true : false;
  }

  // servicio para consultar usuario
  login(usuario: Usuario) {
    let url = env.URI_API.concat('login');
    return this.http.post<any>(url, usuario)
  }

  // servicio para crear usuario
  crearUsuario(usuario: Usuario) {
    let url = env.URI_API.concat('usuario');
    return this.http.post(url, usuario)
  }

  //s ervicio para mostrar todos los usuarios
  allUsuario(){
    let url = env.URI_API.concat('usuario');
    return this.http.get<any>(url)
  }

 // servicio para mostrar usuarios excepto el que esta en uso
  ListaUsuarios(id){
    let url = env.URI_API.concat('usuario'+`/${id}`);
    return this.http.post<any>(url,null)
  }
 // servicio para comprobar duplicidad de correo
  duplicidadCorreo(correo){
    let url = env.URI_API.concat('usuario'+`/${correo}`);
    return this.http.post<any>(url,null)
  }

 // servicio para mostrar un usuario
  selectOne(id){
    let url = env.URI_API.concat('usuario'+`/${id}`);
    return this.http.get<any>(url)
  }

// servicio para eliminar usuario
  delete(id){
    let url = env.URI_API.concat('usuario'+ `/${id}`);
    return this.http.delete<any>(url)
  }

// servicio para actualizar usuario
  updateUsuario(id,updateusuario:Usuario){
    let url = env.URI_API.concat('usuario'+ `/${id}`);
    return this.http.put<any>(url,updateusuario)
  }
}
