import { Injectable } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ParamService } from './param.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private dataPipe = new DatePipe('es-PE');
  private currencyPipe = new CurrencyPipe('en-US');
  private usuario = JSON.parse(localStorage.getItem('usuario')).nombre;

  constructor(private _param: ParamService) { }

  pdfFicha(ficha) {
    const self = this;

    return {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 60],
      content: [
        this.membrete(),
        this.fillText('INFORMACIÓN BÁSICA DEL PROYECTO'),
        this.infoFicha(ficha)
      ],
      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) return self.footerEnd(ficha, false);
        return self.footerEach();
      },
      styles: this.styles,
      images: this.images
    };
  }

  pdfEvaluaion(ficha) {
    const self = this;

    return {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 60],
      content: [
        this.membrete(),
        this.fillText('INFORMACIÓN BÁSICA DEL PROYECTO'),
        this.infoFicha(ficha),
        this.fillText('EVALUACIÓN'),
        this.infoEvaluacion(ficha)
      ],
      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) return self.footerEnd(ficha, true);
        return self.footerEach();
      },
      styles: this.styles,
      images: this.images
    };
  }

  private infoFicha(ficha) {
    return {
      alignment: 'justify',
      columns: [
        [
          {
            columns: [
              { text: 'Sector', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.sector(ficha.sector_nivel_1), color: ficha.sector_nivel_1 ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Sub-sector', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.subsector(ficha.sector_nivel_1, ficha.sector_nivel_2), color: ficha.sector_nivel_2 ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Jurisdicción', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.jurisdiccion(ficha.jurisdiccion), color: ficha.jurisdiccion ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Programa', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.nombre_programa), color: ficha.nombre_programa ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Descripción del programa', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.descripcion_programa), color: ficha.descripcion_programa ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Proyecto', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.nombre_proyecto), color: ficha.nombre_proyecto ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Descripción del proyecto', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.descripcion_proyecto), color: ficha.descripcion_proyecto ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Monto estimado', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this.currencyPipe.transform(ficha.monto_estimado), color: ficha.monto_estimado ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Prioridad del sector', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.prioridad(ficha.prioridad_sector), color: ficha.prioridad_sector ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Comentarios de la prioridad', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.comentarios_prioridad_sector), color: ficha.comentarios_prioridad_sector ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Modalidad contractual', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.ejecutiva(ficha.modalidad_ejecutiva), color: ficha.modalidad_ejecutiva ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Nivel de avance', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.avance(ficha.nivel_avance), color: ficha.nivel_avance ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Observaciones del avance', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.nivel_avance_observacion), color: ficha.nivel_avance_observacion ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Año de inicio de obras', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.anio_inicio_posible), color: ficha.anio_inicio_posible ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Año de puesta en operación', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.anio_puesta_operacion), color: ficha.anio_puesta_operacion ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Departamento(s)', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.departamentos(ficha.departamento), color: ficha.departamento ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          },
          {
            columns: [
              { text: 'Comentarios(s)', margin: [20, 2], bold: true, width: 170 },
              { text: [': ', { text: this._param.empty(ficha.comentarios), color: ficha.comentarios ? 'black' : 'gainsboro' }], margin: [0, 2] }
            ]
          }
        ]
      ], fontSize: 10
    };
  }

  private infoEvaluacion(ficha) {
    return [
      {
        columns: [
          [
            {
              columns: [
                { text: 'Prioridad coincide con politica del sector', margin: [20, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.prio_politica_sect), color: ficha.prio_politica_sect ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [20, 2], width: 170 },
                { text: this._param.empty(ficha.prio_politica_sect_comentario), color: ficha.prio_politica_sect_comentario ? 'black' : 'gainsboro', margin: [5, 2] }
              ]
            }
          ]
        ], fontSize: 10
      },
      { text: 'RIESGO', style: 'subtitle', margin: [20, 10, 0, 0] },
      { canvas: [{ type: 'line', lineColor: '#7EC1FC', x1: 0, y1: 3, x2: 595 - 2 * 40, y2: 0, lineWidth: 1 }], margin: [0, 0, 0, 10] },
      {
        columns: [
          [
            {
              columns: [
                { text: 'Diseño Tecnico', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.riesgo(ficha.riesgo_dis_tec), color: ficha.riesgo_dis_tec ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.riesgo_dis_tec_comentario), color: ficha.riesgo_dis_tec_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Demanda considerada', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.riesgo(ficha.riesgo_dis_deman), color: ficha.riesgo_dis_deman ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.riesgo_dis_deman_comentario), color: ficha.riesgo_dis_deman_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Socioambientales', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.riesgo(ficha.riesgo_socioamb), color: ficha.riesgo_socioamb ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.riesgo_socioamb_comentario), color: ficha.riesgo_socioamb_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Políticos', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.riesgo(ficha.riesgo_politico), color: ficha.riesgo_politico ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.riesgo_politico_comentario), color: ficha.riesgo_politico_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Institucionales', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.riesgo(ficha.riesgo_institucional), color: ficha.riesgo_institucional ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.riesgo_institucional_comentario), color: ficha.riesgo_institucional_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Otros', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.riesgo(ficha.riesgo_otros), color: ficha.riesgo_otros ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.riesgo_otros_comentario), color: ficha.riesgo_otros_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            }
          ]
        ], fontSize: 10
      },
      { text: 'CONCORDANCIA PRODUCTIVA', style: 'subtitle', margin: [20, 10, 0, 0] },
      { canvas: [{ type: 'line', lineColor: '#7EC1FC', x1: 0, y1: 3, x2: 595 - 2 * 40, y2: 0, lineWidth: 1 }], margin: [0, 0, 0, 10] },
      {
        columns: [
          [
            {
              columns: [
                { text: 'Minería', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.productiva_mineria), color: ficha.productiva_mineria ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.productiva_mineria_comentario), color: ficha.productiva_mineria_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Agricultura', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.productiva_agri), color: ficha.productiva_agri ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.productiva_agri_comentario), color: ficha.productiva_agri_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Pesca', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.productiva_pesca), color: ficha.productiva_pesca ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.productiva_pesca_comentario), color: ficha.productiva_pesca_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Industria', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.productiva_indus), color: ficha.productiva_indus ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.productiva_indus_comentario), color: ficha.productiva_indus_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Otros', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.productiva_otros), color: ficha.productiva_otros ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.productiva_otros_comentario), color: ficha.productiva_otros_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            }
          ]
        ], fontSize: 10
      },
      { text: 'CONCORDANCIA SOCIAL', style: 'subtitle', margin: [20, 10, 0, 0] },
      { canvas: [{ type: 'line', lineColor: '#7EC1FC', x1: 0, y1: 3, x2: 595 - 2 * 40, y2: 0, lineWidth: 1 }], margin: [0, 0, 0, 10] },
      {
        columns: [
          [
            {
              columns: [
                { text: 'Transporte', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.social_trans), color: ficha.social_trans ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.social_trans_comentario), color: ficha.social_trans_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Telecomunicación', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.social_telco), color: ficha.social_telco ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.social_telco_comentario), color: ficha.social_telco_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Agua y Saneamiento', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.social_agua), color: ficha.social_agua ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.social_agua_comentario), color: ficha.social_agua_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Riego', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.social_riego), color: ficha.social_riego ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.social_riego_comentario), color: ficha.social_riego_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Educación', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.social_educa), color: ficha.social_educa ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.social_educa_comentario), color: ficha.social_educa_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Salud', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.politica(ficha.social_salud), color: ficha.social_salud ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            },
            {
              columns: [
                { text: '', margin: [30, 2, 0, 10], width: 170 },
                { text: this._param.empty(ficha.social_salud_comentario), color: ficha.social_salud_comentario ? 'black' : 'gainsboro', margin: [5, 2, 0, 10] }
              ]
            },
            {
              columns: [
                { text: 'Síntesis de la evaluación', margin: [30, 2], bold: true, width: 170 },
                { text: [': ', { text: this._param.empty(ficha.sintesis_evaluacion), color: ficha.sintesis_evaluacion ? 'black' : 'gainsboro' }], margin: [0, 2] }
              ]
            }
          ]
        ], fontSize: 10
      }
    ];
  }

  private membrete() {
    return {
      table: {
        widths: ['auto', '*'],
        body: [
          [
            { image: 'logo', width: 100 },
            { text: 'Ficha', style: 'header', alignment: 'right', margin: [0, 10] }
          ]
        ]
      }, layout: 'noBorders'
    };
  }

  private footerEach() {
    return {
      table: {
        body: [
          [
            {
              columns: [
                [
                  { text: [{ text: 'Fecha de creación: ', bold: true }, { text: this.dataPipe.transform(Date.now(), 'dd/MM/yyyy HH:mm:ss') }], margin: [0, 1, 0, 0] },
                  { text: [{ text: 'Usuario: ', bold: true }, { text: this.usuario }], margin: [0, 1, 0, 0] }
                ]
              ], margin: [0, 10]
            }
          ]
        ]
      }, layout: 'noBorders', margin: [40, 0], fontSize: 8
    };
  }

  private footerEnd(ficha, evalu: boolean) {
    let retorno = {
      table: {
        widths: ['*', 'auto'],
        body: [
          [
            {
              columns: [
                [
                  { text: [{ text: 'Fecha de creación: ', bold: true }, { text: this.dataPipe.transform(Date.now(), 'dd/MM/yyyy HH:mm:ss') }], margin: [0, 1, 0, 0] },
                  { text: [{ text: 'Usuario: ', bold: true }, { text: this.usuario }], margin: [0, 1, 0, 0] }
                ]
              ], margin: [0, 10]
            },
            {
              columns: [
                [
                  { text: 'REGISTRO' },
                  { text: [{ text: 'Inicio: ' }, { text: this.dataPipe.transform(ficha.fecha_inicio_reg, 'dd/MM/yyyy HH:mm:ss'), color: '#666666' }], margin: [5, 1, 0, 0] },
                  { text: [{ text: 'Fin: ' }, { text: this.dataPipe.transform(ficha.fecha_final_reg, 'dd/MM/yyyy HH:mm:ss'), color: '#666666' }], margin: [5, 1, 0, 0] },
                  { text: [{ text: 'Usuario: ' }, { text: ficha.usuario_reg.nombre, color: '#666666' }], margin: [5, 1, 0, 0] }
                ]
              ], margin: [5, 0]
            }
          ]
        ]
      }, layout: 'noBorders', margin: [40, 0], fontSize: 8
    };

    if (evalu) {
      retorno.table.widths.push('auto');
      retorno.table.body[0].push({
        columns: [
          [
            { text: 'EVALUACIÓN' },
            { text: [{ text: 'Inicio: ' }, { text: this.dataPipe.transform(ficha.fecha_inicio_eval, 'dd/MM/yyyy HH:mm:ss'), color: '#666666' }], margin: [5, 1, 0, 0] },
            { text: [{ text: 'Fin: ' }, { text: this.dataPipe.transform(ficha.fecha_final_eval, 'dd/MM/yyyy HH:mm:ss'), color: '#666666' }], margin: [5, 1, 0, 0] },
            { text: [{ text: 'Usuario: ' }, { text: ficha.usuario_eval.nombre, color: '#666666' }], margin: [5, 1, 0, 0] }
          ]
        ], margin: [5, 0]
      });
    }

    return retorno;
  }

  private fillText(text) {
    return {
      table: {
        widths: ['*'],
        body: [
          [
            { text: text, style: 'subtitle', fillColor: '#1E88E5', color: 'white', bold: true, margin: [10, 2, 0, 2] }
          ]
        ]
      }, layout: 'noBorders', margin: [0, 10, 0, 10]
    }
  }

  get styles() {
    return {
      header: { fontSize: 18, bold: true },
      subtitle: { fontSize: 10, bold: true }
    };
  }

  get images() {
    return {
      logo: `
        data:image/jpeg;base64,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
      `
    };
  }

}
