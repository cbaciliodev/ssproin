import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'ficha-registrada',
  templateUrl: './registrada.component.html',
  styleUrls: ['./registrada.component.css']
})
export class RegistradaComponent implements OnInit, OnDestroy {

  public saving = false;
  public processing = false;
  public fichaForm: FormGroup;
  public registradaForm: FormGroup;

  private unsubscribe = new Subject<void>();

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.configFormulario();
  }

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
      departamento: this.builder.array([]),
      select_departamento: [''],
      localizacion_latitud: [''],
      localizacion_longitud: [''],
      area_influencia: [''],
      estado_registro: [0]
    });

    this.registradaForm = this.builder.group({
      _id: [''],
      prio_politica_sect: [''],
      prio_politica_sect_comentario: [''],
      riesgo_dis_tec: [''],
      riesgo_dis_tec_comentario: [''],
      riesgo_dis_deman: [''],
      riesgo_dis_deman_comentario: [''],
      riesgo_socioamb: [''],
      riesgo_socioamb_comentario: [''],
      riesgo_politico: [''],
      riesgo_politico_comentario: [''],
      riesgo_otros: [''],
      riesgo_otros_comentario: [''],
      productiva_mineria: [''],
      productiva_mineria_comentario: [''],
      productiva_agri: [''],
      productiva_agri_comentario: [''],
      productiva_pesca: [''],
      productiva_pesca_comentario: [''],
      productiva_indus: [''],
      productiva_indus_comentario: [''],
      productiva_otros: [''],
      productiva_otros_comentario: [''],
      social_trans: [''],
      social_trans_comentario: [''],
      social_telco: [''],
      social_telco_comentario: [''],
      social_agua: [''],
      social_agua_comentario: [''],
      social_riego: [''],
      social_riego_comentario: [''],
      social_educa: [''],
      social_educa_comentario: [''],
      social_salud: [''],
      social_salud_comentario: ['']
    });
  }

  ngOnDestroy() { 
  }

}
