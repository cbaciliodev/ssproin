import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { environment as env } from 'src/environments/environment';
import swal from 'sweetalert';

@Component({
  selector: 'gestion-ficha',
  templateUrl: './gestion.component.html'
})
export class GestionFComponent implements OnInit {

  public loading = false;
  public fichas_registro: Array<any> = [];
  public fichas_registradas: Array<any> = [];

  constructor(private _fichas: FichaService) { }

  ngOnInit() {
    this.getFichas();
  }

  private getFichas() {
    this.loading = true;
    this._fichas.list(this.data)
      .subscribe(
        res => {
          if (res.estado_1) this.fichas_registro = res.estado_1.lista_fichas;
          if (res.estado_2) this.fichas_registradas = res.estado_2.lista_fichas;
        }, _ => swal('Atención', env.MSG.ERROR_LIST, 'error'),
        () => this.loading = false
      );
  }

  get data() {
    return { tipo: 'estado_registro' };
  }

  getSector( sector: string ) {
    if ( sector == 'PTRANSPORTE' ) {
      return 'Transporte';
    }

    if ( sector == 'PAGUA_SANEA' ) {
      return 'Agua y saneamiento urbano';
    }

    if ( sector == 'PENERGIA' ) {
      return 'Energía';
    }

    if ( sector == 'PTELECOMUNIC' ) {
      return 'Telecomunicaciones';
    }

    if ( sector == 'PRIEGO' ) {
      return 'Riego';
    }
  }

}
