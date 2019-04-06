export class Parametro {
    public constructor(
        public _id?: string,
        public grupo?: string,
        public nombre?: string,
        public alias?: string,
        public orden?: string,
        public valor_texto?: string,
        public valor_numero?: number,
        public is_grupo?: number
    ) { }
}