import { TipoForma } from './tipo_forma.model';

export class TipoArchivo {
    constructor (
        public tipo?: number,
        public valor?: TipoForma
    ){}
}