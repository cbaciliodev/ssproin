import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';
import { FichaService } from 'src/app/services/ficha.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ficha-proyecto',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit, OnDestroy {

  public saving = false;
  public fichaForm: FormGroup;

  private nivel_1: Array<Parametro> = [];
  private nivel_trans_2: Array<Parametro> = [];
  private nivel_trans_3: Array<Parametro> = [];
  private nivel_agua_2: Array<Parametro> = [];
  private nivel_agua_3: Array<Parametro> = [];

  private unsubscribe = new Subject<void>();

  constructor(private builder: FormBuilder,
    private route: ActivatedRoute,
    private _ficha: FichaService) { }

  ngOnInit() {
    this.configParametros();
    this.configFormulario();
    this.getFicha();
  }

  private getFicha() {
    this.route.data.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      if (res.ficha) {
        if (res.ficha.data)
          this.configFicha(res.ficha.data);
      }
    });
  }

  private configFicha(ficha) {
    this.fichaForm.addControl('_id', new FormControl(''));
    this.fichaForm.patchValue({ sector_nivel_1: ficha.sector_nivel_1 });
    this.onChangeNivel1();
    this.fichaForm.patchValue(ficha);
  }

  public guardar() {
    if (this.fichaForm.invalid) return;

    this.saving = true;
    this._ficha.save(this.fichaForm.value)
      .subscribe(res => {
        console.log('Success save');
        if (res.data.insert)
          this.fichaForm.addControl(
            '_id', new FormControl(res.data.ficha._id)
          );

      }, _ => console.log('Error save'),
        () => this.saving = false);
  }

  onChangeNivel1() {
    while (this.sector_nivel_2.length !== 0) this.sector_nivel_2.removeAt(0);
    while (this.sector_nivel_3.length !== 0) this.sector_nivel_3.removeAt(0);

    if (this.valor('sector_nivel_1') == 'PTRANSPORTE') {
      for (let i = 0; i < this.nivel_trans_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
      for (let i = 0; i < this.nivel_trans_3.length; i++) this.sector_nivel_3.push(new FormControl(false));
    } else if (this.valor('sector_nivel_1') == 'PAGUA_SANEA') {
      for (let i = 0; i < this.nivel_agua_2.length; i++) this.sector_nivel_2.push(new FormControl(false));
      for (let i = 0; i < this.nivel_agua_3.length; i++) this.sector_nivel_3.push(new FormControl(false));
    }
  }

  public valor(field) {
    return this.fichaForm.get(field).value;
  }

  public invalid(field) {
    return this.fichaForm.get(field).invalid && this.fichaForm.get(field).touched;
  }

  get sector_nivel_2() { return this.fichaForm.get('sector_nivel_2') as FormArray }
  get sector_nivel_3() { return this.fichaForm.get('sector_nivel_3') as FormArray }

  private configFormulario() {
    this.fichaForm = this.builder.group({
      sector_nivel_1: ['', Validators.required],
      sector_nivel_2: this.builder.array([]),
      sector_nivel_3: this.builder.array([]),
      jurisdiccion: ['', Validators.required],
      jurisdiccion_otro: [''],
      nombre_programa: [''],
      descripcion_programa: [''],
      nombre_proyecto: ['', Validators.required],
      descripcion_proyecto: [''],
      monto_estimado: [0],
      prioridad_sector: [''],
      comentarios_prioridad_sector: [''],
      modalidad_ejecutiva: [''],
      modalidad_ejecutiva_otra: [''],
      nivel_avance: [''],
      nivel_avance_fisico: [0],
      nivel_avance_financiero: [0],
      anio_inicio_posible: [''],
      meses_ejecucion: [''],
      departamento: [''],
      localizacion_latitud: [''],
      localizacion_longitud: [''],
      area_influencia: ['']
    });
  }

  private configParametros() {
    this.nivel_1 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1));
    this.nivel_trans_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_2));
    this.nivel_trans_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_TRANS_3));
    this.nivel_agua_2 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_2));
    this.nivel_agua_3 = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_AGUA_3));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
