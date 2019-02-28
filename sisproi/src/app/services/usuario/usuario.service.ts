import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_SERVICIOS= 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    console.log("Serviocio de usuario listo");
  }
 
//servicio para consuñtar usuario
login(usuario :Usuario ,recordar:boolean =false){
  
  let url = this.URL_SERVICIOS + '/login';
  return this.http.post<any>(url,usuario)

}

//servicio para crear usuario
  crearUsuario(usuario :Usuario){
    let url = this.URL_SERVICIOS + '/usuario';
    return this.http.post(url,usuario)
}

  
  // save(data) {
  //   let URL = env.URI_API.concat('ficha/', data._id? 'update': 'insert');
  //   return this.http.post<any>(URL, data);
  // }




}
