import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { AccionService } from 'src/app/services/accion.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { environment as env } from 'src/environments/environment';
import { fichaHeader } from 'src/app/commons/constant';
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
  public generating = false;
  public fichas_registro: Array<any> = [];
  public fichas_registradas: Array<any> = [];

  public filtroForm: FormGroup;
  public sector_1: Array<Parametro> = [];
  private sectores: Array<string> = [];

  public dataCSV: any[] = [];
  public headerCSV = fichaHeader;
  public filenameCSV: string = '';
  @ViewChild('fichaCSV') fichaCSV: ElementRef;

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

  public reporteCSV() {
    this.generating = true;
    this._ficha.csv(this.filtro)
      .subscribe(
        res => {
          this.dataCSV = res.data;
          this.filenameCSV = `Ficha_${Date.now()}.csv`;
          setTimeout(_ => {
            this.fichaCSV.nativeElement.click();
          }, 200);
        }, err => console.log('Error', err),
        () => this.generating = false
      );
  }

  get filtro() {
    let filtro = this.filtroForm.value;
    if (!filtro.sector_nivel_1)
      filtro.sector_nivel_1 = this.sectores;
    else filtro.sector_nivel_1 = [filtro.sector_nivel_1];

    return filtro;
  }

  private configFiltro() {
    this.filtroForm = this.builder.group({
      tipo: ['estado_registro'],
      sector_nivel_1: [''],
      nombre_programa: [''],
      nombre_proyecto: [''],
      estado: [[]]
    });
  }

  private configParametros() {

    console.log('Sector 1');
    console.log(localStorage.getItem(env.PARAMETRO.NIVEL_1));

    console.log('Usuario');
    console.log(localStorage.getItem(env.PARAMETRO.NIVEL_1));

    this.sector_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
    this.sectores = JSON.parse(localStorage.getItem('usuario')).sector;
  }

}
