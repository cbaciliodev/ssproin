import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( public _usuario: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
  }

  have( sector: string ) {

    for ( const st of this._usuario.userLogin().sector ) {

      console.log( st.concat(', ', sector) );

      if ( st == sector || st == 'PTODO' ) {
        return true;
      }
    }

    return false;
  }

}
