import { TipoArchivo } from './tipo_archivo.model';
import { Departamento } from './departamento.model';
import { Parametro } from './parametro.model';

export class ViewFicha {
    constructor (
        public anio_inicio_posible: number,
        public anio_puesta_operacion: number,
        public archivo_adicional: string,
        public area_influencia: TipoArchivo,
        public comentarios: string,
        public comentarios_prioridad_sector: string,
        public departamento: Departamento,
        public descripcion_programa: string,
        public descripcion_proyecto: string,
        public estado: number,
        public estado_evaluacion: number,
        public estado_registro: number,
        public fecha_actual_reg: Date,
        public fecha_final_reg: Date,
        public fecha_inicio_reg: Date,
        public filename_adicional: string,
        public jurisdiccion: string,
        public jurisdiccion_otro: string,
        public localizacion_latitud: TipoArchivo,
        public localizacion_longitud: string,
        public modalidad: Parametro,
        public modalidad_ejecutiva: string,
        public modalidad_ejecutiva_otra: string,
        public monto_estimado: number,
        public nivel_avance: string,
        public nivel_avance_observacion: string,
        public nombre_programa: string,
        public nombre_proyecto: string,
        public prioridad_sector: string,
        public sector: Parametro,
        public sector_nivel_number: string,
        public sector_nivel_2: [ boolean ],
        public usuario_reg: string,
        public _id: string,
        public is_priorizado?: number
    ){ }
}