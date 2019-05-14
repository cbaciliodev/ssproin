import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/service.index';
import { ViewFicha } from 'src/app/models/fichas.model';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styles: []
})
export class ListProyectosComponent implements OnInit {

  data: Array<ViewFicha> = []
  
  constructor( public _fc: FichaService ) { 
    this.init();
  }

  ngOnInit() { }

  init(){
    this._fc.listarTodo( ).subscribe( _data => this.data = _data );
  }

  evaluarAvance( avance: string ){
    if( avance == 'AVANCE_IDEA' ){
      return 'Idea';
    }
    if( avance == 'AVANCE_PREINVER' ){
      return 'Pre inversión';
    }
    if( avance == 'AVANCE_DISENO' ){
      return 'Diseño';
    }
    if( avance == 'AVANCE_EJECUCION' ){
      return 'Ejecución';
    }
    if( avance == 'AVANCE_PRE' ){
      return 'Avance preliminar';
    }
    if( avance == 'AVANCE_CONSTRUCCION' ){
      return 'Construcción';
    }
    if( avance == 'AVANCE_FACTIBILIAD' ){
      return 'Factibilidad';
    }
    if( avance == 'AVANCE_INGENIERIA' ){
      return 'Ingeniería de detalle';
    }

    return "";
  }

  isArchivo( data: any ): boolean {

    var punto = JSON.parse( data );
    try{
      console.log( punto.valor );
      if( punto.valor.startsWith('http://') ){
        return true
      }
    }catch(e){
      return false;
    }

  }

  marcar( i: number, value: number) {

    this.data[i].is_priorizado = value;
    this._fc.priorizar( this.data[ i ]._id, value ).subscribe( _data => console.log( _data ) );
    
  }

}
