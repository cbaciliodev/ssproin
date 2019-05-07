import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( public router: Router ) { }
  usuario;
  _id;
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this._id =localStorage.getItem('id');
  }

  cerrarSecion(){
    swal("Cerrar sesion de usuario "+this.usuario.nombre, {
      title: 'Estas seguro?',
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true
          })
      .then((salir) => {
        if (salir) {
          localStorage.clear();
          this.router.navigate( ['/login'] );
        } 
      }); 
  }

}
