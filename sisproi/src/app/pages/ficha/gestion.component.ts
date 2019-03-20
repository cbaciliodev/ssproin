import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { AccionService } from 'src/app/services/accion.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { environment as env } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Parametro } from 'src/app/models/parametro.model';
import { saveAs } from 'file-saver';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import swal from 'sweetalert';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'gestion-ficha',
  templateUrl: './gestion.component.html'
})
export class GestionFComponent implements OnInit {

  public totalItems = 34;
  public currentPage = 1;

  public loading = false;
  public fichas_registro: Array<any> = [];
  public fichas_registradas: Array<any> = [];

  public filtroForm: FormGroup;
  public sector_1: Array<Parametro> = [];

  constructor(private builder: FormBuilder,
    private _ficha: FichaService,
    public _accion: AccionService,
    private _reporte: ReporteService) { }

  ngOnInit() {
    this.configParametros();
    this.configFiltro();
    this.getFichas();
  }

  public getFichas() {
    this.loading = true;
    this.fichas_registro = [];
    this.fichas_registradas = [];

    this._ficha.list(this.filtro)
      .subscribe(
        res => {
          if (res.estado_1) this.fichas_registro = res.estado_1.lista_fichas;
          if (res.estado_2) this.fichas_registradas = res.estado_2.lista_fichas;
        }, _ => swal('Atención', env.MSG.ERROR_LIST, 'error'),
        () => this.loading = false
      );
  }

  public onPaginate(paginate) {
    this.currentPage = paginate.page;
    let skip = paginate.limit * (paginate.page - 1);
    console.log(skip);
  }

  public download(row) {
    this._ficha.report(row)
      .subscribe(
        res => {
          let ficha = this._reporte.pdfFicha(res.data);
          let pdfGenerator = pdfMake.createPdf(ficha);
          pdfGenerator.getBlob((blob) => {
            saveAs(blob, `${new Date().getTime()}.pdf`);
          });
        }, err => console.log('Error', err),
        () => console.log('Complete')
      )
  }

  get filtro() {
    return this.filtroForm.value;
  }

  private configFiltro() {
    this.filtroForm = this.builder.group({
      tipo: ['estado_registro'],
      sector_nivel_1: [''],
      nombre_programa: [''],
      nombre_proyecto: ['']
    });
  }

  private configParametros() {
    this.sector_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
  }

}
