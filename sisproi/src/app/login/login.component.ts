import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';

import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma : FormGroup
  constructor(public router: Router ,public _usuarioService : UsuarioService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      correo: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      recordar : new FormControl(false)
    });
  }


  funcionLogin(){
    if(this.forma.invalid){
      return;
    }
    let usuario = new Usuario( null, this.forma.value.correo, this.forma.value.password);

    this._usuarioService.login(usuario,this.forma.value.recordar).
      subscribe(res =>{
        this.router.navigate( ['/dashboard'] );
        localStorage.setItem('id',res.id),
        localStorage.setItem('token',res.token),
        localStorage.setItem('usuario',JSON.stringify(res.usuario)),
        console.log("guardado en localStorage")
      });

    
  }

}
