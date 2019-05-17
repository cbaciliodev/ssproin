import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductivaService } from 'src/app/services/productiva.service';
import { AccionService } from 'src/app/services/accion.service';
import swal from 'sweetalert';
import { parse } from 'querystring';
@Component({
  selector: 'app-gestor-productivos',
  templateUrl: './gestor-productivos.component.html',
  styleUrls: []
})
export class GestorProductivosComponent implements OnInit {
  public _listaBySector: Array<any>[];
  tipoFormulario: String = '';

  constructor(private _productiva: ProductivaService,
    private activerouter: ActivatedRoute) {
  }

  ngOnInit() {

    this.activerouter.params.subscribe(params => {
      this.tipoFormulario = params['sector'];
      this.listBySsector();
      console.log(this._listaBySector)

    });
  }
  //{"tipo":0,"valor":{"tipoForma":0,"objectData":{"position":{"lat":-12.04822784715243,"lng":-76.86084382270815},"clickable":true,"visible":true}}}
  listBySsector() {
    this._productiva
      .listsector(this.tipoFormulario)
      .subscribe(res => {
        this._listaBySector = res.data;
      });
  }

  public _ubigeo(ubicacion) {
    let data = JSON.parse(ubicacion);
    return data.valor.tipoForma || data.valor.tipoForma == 0 ? data.valor.tipoForma : data.valor;
  }

}

