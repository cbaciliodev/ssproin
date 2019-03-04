import { Component, OnInit, Input } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Parametro } from 'src/app/models/parametro.model';
import { FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'ficha-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  @Input() public registradaForm: FormGroup;

  private prioridad: Array<Parametro> = [];
  private prioridad_politica: Array<Parametro> = [];

  constructor() { }

  ngOnInit() {
    this.configParametros();
    this.validateFields();
  }

  public valor(field) {
    return this.registradaForm.get(field).value;
  }

  private validateFields() {
    this.fieldOnChange('productiva_mineria', 'productiva_mineria_comentario');
    this.fieldOnChange('productiva_agri', 'productiva_agri_comentario');
    this.fieldOnChange('productiva_pesca', 'productiva_pesca_comentario');
    this.fieldOnChange('productiva_indus', 'productiva_indus_comentario');
    this.fieldOnChange('productiva_otros', 'productiva_otros_comentario');
    this.fieldOnChange('social_trans', 'social_trans_comentario');
    this.fieldOnChange('social_telco', 'social_telco_comentario');
    this.fieldOnChange('social_agua', 'social_agua_comentario');
    this.fieldOnChange('social_riego', 'social_riego_comentario');
    this.fieldOnChange('social_educa', 'social_educa_comentario');
    this.fieldOnChange('social_salud', 'social_salud_comentario');
  }

  private configParametros() {
    this.prioridad = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD));
    this.prioridad_politica = JSON.parse(localStorage.getItem(env.PARAMETRO.PRIORIDAD_POLITICA));
  }

  private fieldOnChange(field, disabled) {
    let initial = this.registradaForm.get(field).value;

    this.registradaForm.get(field).valueChanges.pipe(
      startWith(initial)
    ).subscribe(val => {
      if (val) this.registradaForm.get(disabled).enable();
      else this.registradaForm.get(disabled).disable();
    });
  }

}
