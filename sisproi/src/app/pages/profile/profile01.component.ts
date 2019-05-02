import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-profile01',
  templateUrl: './profile01.component.html',
  styles: []
})
export class Profile01Component implements OnInit {
    constructor(public _usuario : UsuarioService , private activeroute :ActivatedRoute ) { }
    public usuario : Usuario = {};
    sectoresParam;
    sectores = [];
  
    ngOnInit() {
     this.panelPerfil()
    }
  
  
    panelPerfil(){
      this._usuario.selectOne(this.activeroute.snapshot.queryParamMap.get('id')).subscribe(res =>{
        this.usuario=res.data;
        this.sectoresParam = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
      for(let i=0 ; i<(this.usuario.sector.length) ; i++){
        let exist = this.sectoresParam.find(d => d.nombre === this.usuario.sector[i]);
        if (exist)this.sectores.push(exist); 
      }
      })   
    }
}
