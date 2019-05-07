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
        data:image/png;base64,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
      `
    };
  }

}
