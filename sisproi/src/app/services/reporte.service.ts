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
      columns: [
        [
          { text: 'Sector', margin: [20, 2], bold: true },
          { text: 'Programa', margin: [20, 2], bold: true },
          { text: 'Proyecto', margin: [20, 2], bold: true },
          { text: 'Monto estimado', margin: [20, 2], bold: true },
          { text: 'Prioridad del sector', margin: [20, 2], bold: true },
          { text: 'Modalidad contractual', margin: [20, 2], bold: true },
          { text: 'Nivel de avance', margin: [20, 2], bold: true },
          { text: 'Año de inicio de obras', margin: [20, 2], bold: true },
          { text: 'Año de puesta en operación', margin: [20, 2], bold: true },
          { text: 'Departamento(s)', margin: [20, 2], bold: true },
        ],
        [
          { text: [': ', { text: this._param.sector(ficha.sector_nivel_1), color: ficha.sector_nivel_1 ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.empty(ficha.nombre_programa), color: ficha.nombre_programa ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.empty(ficha.nombre_proyecto), color: ficha.nombre_proyecto ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this.currencyPipe.transform(ficha.monto_estimado) }], margin: [0, 2] },
          { text: [': ', { text: this._param.prioridad(ficha.prioridad_sector), color: ficha.prioridad_sector ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.ejecutiva(ficha.modalidad_ejecutiva), color: ficha.modalidad_ejecutiva ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.avance(ficha.nivel_avance), color: ficha.nivel_avance ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.empty(ficha.anio_inicio_posible), color: ficha.anio_inicio_posible ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.empty(ficha.anio_puesta_operacion), color: ficha.anio_puesta_operacion ? 'black' : 'gainsboro' }], margin: [0, 2] },
          { text: [': ', { text: this._param.departamentos(ficha.departamento), color: ficha.departamento.length > 0 ? 'black' : 'gainsboro' }], margin: [0, 2] }
        ]
      ], fontSize: 10
    };
  }

  private infoEvaluacion(ficha) {
    return [
      {
        columns: [
          [{ text: 'Prioridad coincide con politica del sector', margin: [20, 0], bold: true }],
          [{ text: [': ', { text: this._param.politica(ficha.prio_politica_sect), color: ficha.prio_politica_sect ? 'black' : 'gainsboro' }], margin: [0, 2] },]

        ], fontSize: 10
      },
      { text: 'RIESGO', style: 'subtitle', margin: [20, 10, 0, 0] },
      { canvas: [{ type: 'line', lineColor: '#7EC1FC', x1: 0, y1: 3, x2: 595 - 2 * 40, y2: 0, lineWidth: 1 }], margin: [0, 0, 0, 10] },
      {
        columns: [
          [
            { text: 'Diseño Tecnico', margin: [30, 2], bold: true },
            { text: 'Demanda considerada', margin: [30, 2], bold: true },
            { text: 'Socioambientales', margin: [30, 2], bold: true },
            { text: 'Políticos', margin: [30, 2], bold: true },
            { text: 'Institucionales', margin: [30, 2], bold: true },
            { text: 'Otros', margin: [30, 2], bold: true }
          ],
          [
            { text: [': ', { text: this._param.riesgo(ficha.riesgo_dis_tec), color: ficha.riesgo_dis_tec ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.riesgo(ficha.riesgo_dis_deman), color: ficha.riesgo_dis_deman ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.riesgo(ficha.riesgo_socioamb), color: ficha.riesgo_socioamb ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.riesgo(ficha.riesgo_politico), color: ficha.riesgo_politico ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.riesgo(ficha.riesgo_institucional), color: ficha.riesgo_institucional ? 'black' : 'gainsboro' }] },
            { text: [': ', { text: this._param.riesgo(ficha.riesgo_otros), color: ficha.riesgo_otros ? 'black' : 'gainsboro' }] }
          ]
        ], fontSize: 10
      },
      { text: 'CONCORDANCIA PRODUCTIVA', style: 'subtitle', margin: [20, 10, 0, 0] },
      { canvas: [{ type: 'line', lineColor: '#7EC1FC', x1: 0, y1: 3, x2: 595 - 2 * 40, y2: 0, lineWidth: 1 }], margin: [0, 0, 0, 10] },
      {
        columns: [
          [
            { text: 'Minería', margin: [30, 2], bold: true },
            { text: 'Agricultura', margin: [30, 2], bold: true },
            { text: 'Pesca', margin: [30, 2], bold: true },
            { text: 'Industria', margin: [30, 2], bold: true },
            { text: 'Otros', margin: [30, 2], bold: true }
          ],
          [
            { text: [': ', { text: this._param.politica(ficha.productiva_mineria), color: ficha.productiva_mineria ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.productiva_agri), color: ficha.productiva_agri ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.productiva_pesca), color: ficha.productiva_pesca ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.productiva_indus), color: ficha.productiva_indus ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.productiva_otros), color: ficha.productiva_otros ? 'black' : 'gainsboro' }], margin: [0, 2] }
          ]
        ], fontSize: 10
      },
      { text: 'CONCORDANCIA SOCIAL', style: 'subtitle', margin: [20, 10, 0, 0] },
      { canvas: [{ type: 'line', lineColor: '#7EC1FC', x1: 0, y1: 3, x2: 595 - 2 * 40, y2: 0, lineWidth: 1 }], margin: [0, 0, 0, 10] },
      {
        columns: [
          [
            { text: 'Transporte', margin: [30, 2], bold: true },
            { text: 'Telecomunicación', margin: [30, 2], bold: true },
            { text: 'Agua y Saneamiento', margin: [30, 2], bold: true },
            { text: 'Riego', margin: [30, 2], bold: true },
            { text: 'Educación', margin: [30, 2], bold: true },
            { text: 'Salud', margin: [30, 2], bold: true }
          ],
          [
            { text: [': ', { text: this._param.politica(ficha.social_trans), color: ficha.social_trans ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.social_telco), color: ficha.social_telco ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.social_agua), color: ficha.social_agua ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.social_riego), color: ficha.social_riego ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.social_educa), color: ficha.social_educa ? 'black' : 'gainsboro' }], margin: [0, 2] },
            { text: [': ', { text: this._param.politica(ficha.social_salud), color: ficha.social_salud ? 'black' : 'gainsboro' }], margin: [0, 2] }
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
