import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
  constructor(public _usuario : UsuarioService,
    public router: Router){}
  canActivate(){
    
    if(JSON.parse(localStorage.getItem('usuario')).perfil=='Administrador'){
      return true;
     }else{
      this.router.navigate(['/dashboard']);
      return false;
     } 


  }
}
