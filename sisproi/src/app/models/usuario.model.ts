export class Usuario {
    public constructor(
        public _id?: string,
        public nombre?: string,
        public correo?: string,
        public password?: string,
        public avatar?: string,
        public sector?: Array<string>,
        public accion?: Array<string>
    ) { }
}
