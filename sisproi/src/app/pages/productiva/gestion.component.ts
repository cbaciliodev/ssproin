import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductivaService } from 'src/app/services/productiva.service';
import { environment as env } from 'src/environments/environment';
import { AccionService } from 'src/app/services/accion.service';
import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'gestion-productiva',
  templateUrl: './gestion.component.html'
})
export class GestionPComponent implements OnInit {

  public loading = false;
  public fichas_productivas: Array<any> = [];

  public filtroForm: FormGroup;

  constructor(private builder: FormBuilder,
    private _productiva: ProductivaService,
    public _accion: AccionService) { }

  ngOnInit() {
    init_plugins();

    this.configFiltro();
    this.getProductivas();
  }

  public getProductivas() {
    this.loading = true;
    this.fichas_productivas = [];

    this._productiva.list(this.filtro)
      .subscribe(
        res => this.fichas_productivas = res.data,
        _ => swal('Atención', env.MSG.ERROR_LIST, 'error'),
        () => this.loading = false
      );
  }

  public eliminar(row) {
    swal({
      title: 'Atención',
      text: env.MSG.WARN_DELETE,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true
    }).then(res => {
      if (res) {
        this._productiva.delete(row)
          .subscribe(
            _ => swal('Atención', env.MSG.SUCCESS_DELETE, 'success'),
            _ => swal('Atención', env.MSG.ERROR_DELETE, 'error'),
            () => this.getProductivas()
          );
      }
    });
  }

  get filtro() {
    return this.filtroForm.value;
  }

  private configFiltro() {
    this.filtroForm = this.builder.group({
      nombre_proyecto: [''],
      operador: ['']
    });
  }

}
