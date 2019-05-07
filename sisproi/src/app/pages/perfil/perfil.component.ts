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

  eliminarPerfil(id){  

    /* if(id==localStorage.getItem('id')){
      swal('No se puede borrar usuario','No se puede borrar a si mismo','error');
    return;
    } */

    swal("Una vez eliminado, no podrás recuperar este perfil!", {
      title: 'Estas seguro?',
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true
          })
      .then((willDelete) => {
        if (willDelete) {
          this._perfil.delete(id).subscribe(res=>{
            this.ListPerfil();
            swal("Perfil a sido eliminado!", {
              icon: "success",
            });
          });  
        } else {
          swal("No se elimino perfil!");
        }
      }); 
  }

}
