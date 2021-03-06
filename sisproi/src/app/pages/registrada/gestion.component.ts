import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';
import { AccionService } from 'src/app/services/accion.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { PdfService } from 'src/app/services/pdf.service';
import { environment as env } from 'src/environments/environment';
import { evalHeader } from 'src/app/commons/constant';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Parametro } from 'src/app/models/parametro.model';
import swal from 'sweetalert';

// declare function init_plugins();

@Component({
  selector: 'gestion-registradas',
  templateUrl: './gestion.component.html'
})
export class GestionRComponent implements OnInit {

  public loading = false;
  public generating = false;
  public fichas_registradas: Array<any> = [];
  public fichas_evaluacion: Array<any> = [];
  public fichas_evaluadas: Array<any> = [];

  public filtroForm: FormGroup;
  public sector_1: Array<Parametro> = [];
  private sectores: Array<string> = [];

  public dataCSV: any[] = [];
  public headerCSV = evalHeader;
  public filenameCSV: string = '';
  @ViewChild('evalCSV') evalCSV: ElementRef;

  constructor(private builder: FormBuilder,
    private _ficha: FichaService,
    public _accion: AccionService,
    private _reporte: ReporteService,
    private _pdf: PdfService) { }

  ngOnInit() {
    this.configParametros();
    this.configFiltro();
    this.getFichas();
  }

  public getFichas() {
    this.loading = true;
    this.fichas_registradas = [];
    this.fichas_evaluacion = [];
    this.fichas_evaluadas = [];

    this._ficha.list(this.filtro)
      .subscribe(
        res => {
          if (res.estado_0) this.fichas_registradas = res.estado_0.lista_fichas;
          if (res.estado_1) this.fichas_evaluacion = res.estado_1.lista_fichas;
          if (res.estado_2) this.fichas_evaluadas = res.estado_2.lista_fichas;
        }, _ => swal('Atención', env.MSG.ERROR_LIST, 'error'),
        () => this.loading = false
      );
  }

  public download(row) {
    this._ficha.report(row)
      .subscribe(
        res => {
          let ficha = this._reporte.pdfEvaluaion(res.data);
          this._pdf.pdfViewer(ficha);
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
          this.filenameCSV = `Evaluacion_${Date.now()}.csv`;
          setTimeout(_ => {
            this.evalCSV.nativeElement.click();
          }, 200);
        }, err => console.log('Error', err),
        () => this.generating = false
      );
  }

  get filtro() {
    let filtro = this.filtroForm.value;
    if (!filtro.sector_nivel_1)
      filtro.sector_nivel_1 = this.sectores;
    else if (!Array.isArray(filtro.sector_nivel_1)) {
      filtro.sector_nivel_1 = [filtro.sector_nivel_1];
    }

    return filtro;
  }

  private configFiltro() {
    this.filtroForm = this.builder.group({
      tipo: ['estado_evaluacion'],
      sector_nivel_1: [''],
      nombre_programa: [''],
      nombre_proyecto: [''],
      evaluacion: [true],
      estado: [[null, 0]]
    });
  }

  private configParametros() {
    this.sector_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
    this.sectores = JSON.parse(localStorage.getItem('usuario')).sector;
  }

}
