import { Component, OnInit, Input } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-detalle-py',
  templateUrl: './detalle-py.component.html',
  styleUrls: ['./detalle-py.component.css']
})
export class DetallePyComponent implements OnInit {

  @Input() titulo: string;
  @Input() sector: string;

  proyectos = 0;
  recibidos = 0;
  evaluados = 0;
  enEvaluacion = 0;
  registrados = 0;

  recibidosPrc = '0';
  registradosPrc = '0';
  enEvaluacionPrc = '0';
  evaluadosPrc = '0';

  constructor( public _ficha: FichaService ) {}

  ngOnInit() {

    this._ficha.summary(this.sector).subscribe( (xhr: any) => {

      this.recibidos = xhr.data.Registro;
      this.registrados = xhr.data.RegistroFin;
      this.enEvaluacion = xhr.data.Evaluacion;
      this.evaluados = xhr.data.Evaluados;

      this.proyectos = xhr.data.Registro + xhr.data.RegistroFin;

      if (Number(this.proyectos) !== 0) {
        this.recibidosPrc =  (this.recibidos / this.proyectos * 100).toFixed() + '%' ;
        this.registradosPrc =  (this.registrados / this.proyectos * 100).toFixed() + '%' ;
        this.enEvaluacionPrc =  (this.enEvaluacion / this.proyectos * 100).toFixed() + '%' ;
        this.evaluadosPrc = (this.evaluados / this.proyectos * 100).toFixed() + '%';
      }
    });
  }
}
