import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  constructor(public _usuario : UsuarioService) { }

  public listaUsuarios: Usuario[];
  public usuarioupdate: Usuario;

  ngOnInit() {
    this.listUsuarios()
  }

  listUsuarios(){
   this._usuario.allUsuario()
   .subscribe(res=>{
     this.listaUsuarios=res.data;
   })
  }

  eliminarUsuario(id){  
      swal("Una vez eliminado, no podrás recuperar este usuario!", {
        buttons: ["Cancelar!", "Eliminar!"],
          })
      .then((willDelete) => {
        if (willDelete) {
          this._usuario.delete(id).subscribe()
          swal("Usuario a sido eliminado!", {
            icon: "success",
          });
        } else {
          swal("No se elimino usuario!");
        }
      });
  }

}