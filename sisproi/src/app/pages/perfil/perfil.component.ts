import { Component, OnInit } from '@angular/core';
import{PerfilService} from '../../services/perfil.service';
import{Perfil} from 'src/app/models/perfil.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: []
})
export class PerfilComponent implements OnInit {

  constructor(public _perfil : PerfilService) { }

  public listaPerfiles: Perfil[];


  ngOnInit() {
    this.ListPerfil();
  }



  ListPerfil(){
    this._perfil.allPerfil().subscribe(res=>{
      this.listaPerfiles=res.data;
      console.log(res.data);
    })
    
  }

}
