import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  userExiste = true;

  constructor(public router: Router, public _usuario: UsuarioService) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      recordar: new FormControl(false)
    });
  }

  public invalid(field) {
    return this.forma.get(field).invalid && this.forma.get(field).touched;
  }

  funcionLogin() {
    if (this.forma.invalid) return;

    this._usuario.login(this.forma.value)
      .subscribe(res => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigate(['/dashboard']);
      }, _ => this.userExiste = false);
  }

}
