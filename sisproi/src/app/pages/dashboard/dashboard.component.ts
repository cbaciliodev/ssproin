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
  pyRegistradosP = '0%';
  pyEvaluados = 0;
  pyEvaluadosP = '0%';

  pyTotal = 0;

  ngOnInit() {
    init_plugins();
  }

  have( sector: string ) {

    for ( const st of this._usuario.userLogin().sector ) {

      if ( st == sector || st == 'PTODO' ) {
        return true;
      }
    }

    return false;
  }

  summary( emmit ) {
    console.log(emmit);
    this.pyRegistrados = this.pyRegistrados + emmit.registrados;
    this.pyEvaluados = this.pyEvaluados + emmit.evaluados;
    this.pyTotal = this.pyTotal + emmit.total;

    this.calcularPorcentajes();
  }

  calcularPorcentajes() {
    if ( this.pyTotal != 0 ) {
      this.pyEvaluadosP =  (this.pyEvaluados / this.pyTotal * 100).toFixed() + '%' ;
      this.pyRegistradosP =  (this.pyRegistrados / this.pyTotal * 100).toFixed() + '%' ;
    }
  }

}
