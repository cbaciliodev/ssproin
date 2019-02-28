// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URI_API: 'http://localhost:3000/',
  PARAMETRO: {
    NIVEL_1: 'NIVEL_1',
    NIVEL_TRANS_2: 'NIVEL_TRANS_2',
    NIVEL_TRANS_3: 'NIVEL_TRANS_3',
    NIVEL_AGUA_2: 'NIVEL_AGUA_2',
    NIVEL_AGUA_3: 'NIVEL_AGUA_3',
    JURISDICCION: 'JURISDICCION',
    PRIORIDAD_SECTOR: 'PRIORIDAD_SECTOR',
    MODALIDAD_EJECU: 'MODALIDAD_EJECU',
    NIVEL_AVANCE: 'NIVEL_AVANCE',
    DEPARTAMENTO: 'DEPARTAMENTO',
    MES: 'MES'
  },
  MSG: {
    SUCCESS_INSERT: 'El registro fue guardado correctamente',
    SUCCESS_UPDATE: 'El registro fue actualizado correctamente',
    ERROR_INSERT: 'Tuvimos problemas al guardar el registro'
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
