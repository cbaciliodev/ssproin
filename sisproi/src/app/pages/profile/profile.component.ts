import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  usuario;
  sectoresParam;
  sectores = [];

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.Secotores();
  }


  Secotores(){
    this.sectoresParam = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
    for(let i=0 ; i<(this.usuario.sector.length) ; i++){
      let exist = this.sectoresParam.find(d => d.nombre === this.usuario.sector[i]);
      if (exist)this.sectores.push(exist); 
    }
  }


}
