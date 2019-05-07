import { Component, OnInit } from '@angular/core';
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
    this._usuario.ListaUsuarios(localStorage.getItem('id'))
    .subscribe(res=>{
      this.listaUsuarios=res.data; 
    })
  }


  eliminarUsuario(id){  
    if(id==localStorage.getItem('id')){
      swal('No se puede borrar usuario','No se puede borrar a si mismo','error');
    return;
    }

    swal("Una vez eliminado, no podrás recuperar este usuario!", {
      title: 'Estas seguro?',
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true
          })
      .then((willDelete) => {
        if (willDelete) {
          this._usuario.delete(id).subscribe(res=>{
            this.listUsuarios();
            swal("Usuario a sido eliminado!", {
              icon: "success",
            });
          });  
        } else {
          swal("No se elimino usuario!");
        }
      }); 
  }
  
}