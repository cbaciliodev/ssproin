// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URI_API: 'http://3.17.110.176:3040/',
  PARAMETRO: {
    NIVEL_1: 'NIVEL_1',
    NIVEL_TRANS_2: 'NIVEL_TRANS_2',
    NIVEL_AGUA_2: 'NIVEL_AGUA_2',
    NIVEL_ENERGIA_2: 'NIVEL_ENERGIA_2',
    NIVEL_TELECOM_2: 'NIVEL_TELECOM_2',
    NIVEL_RIEGO_2: 'NIVEL_RIEGO_2',
    JURISDICCION: 'JURISDICCION',
    PRIORIDAD_SECTOR: 'PRIORIDAD_SECTOR',
    PRIORIDAD_RIESGO: 'PRIORIDAD_RIESGO',
    MODALIDAD_EJECU: 'MODALIDAD_EJECU',
    NIVEL_AVANCE: 'NIVEL_AVANCE',
    DEPARTAMENTO: 'DEPARTAMENTO',
    MES: 'MES',
    PRIORIDAD_POLITICA: 'PRIORIDAD_POLITICA'
  },
  MSG: {
    SUCCESS_INSERT: 'El registro fue guardado correctamente',
    SUCCESS_UPDATE: 'El registro fue actualizado correctamente',
    SUCCESS_PROCESS: 'El registro fue procesado correctamente',
    SUCCESS_FILE: 'El archivo fue cargado correctamente',
    WARN_PROCESS: 'Una vez procesado, no podrá editar el registro',
    ERROR_INSERT: 'Tuvimos problemas al guardar el registro',
    ERROR_PROCESS: 'Tuvimos problemas al procesar el registro',
    ERROR_LIST: 'Tuvimos problemas al listar los registros'
  },
  TIPO_FORMULARIO: {
    MAPA: 0,
    ARCHIVO: 1
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
