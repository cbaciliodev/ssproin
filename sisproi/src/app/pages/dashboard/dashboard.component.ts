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

  pyRegistrados = 0;
  pyRegistradosP = '';
  pyEvaluados = 0;
  pyEvaluadosP = '';

  pyTotal = 0;

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

  incrementaPyRegistrados( emmit ) {
    this.pyRegistrados = this.pyRegistrados + Number(emmit);
    this.pyTotal = this.pyTotal + this.pyRegistrados;

    this.pyRegistradosP =  (this.pyRegistrados / this.pyTotal * 100).toFixed() + '%' ;
  }

  incrementaPyEvaluados( emmit ) {
    this.pyEvaluados = this.pyEvaluados + Number(emmit);
    this.pyTotal = this.pyTotal + this.pyEvaluados;

    this.pyEvaluadosP =  (this.pyEvaluados / this.pyTotal * 100).toFixed() + '%' ;
  }

}
