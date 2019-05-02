export class Usuario {
    public constructor(
        
        public nombre?: string,
        public correo?: string,
        public password?: string,
        public perfil?:string,
        public sector?: Array<any>,
        public accion?: Array<any>,
        public avatar?: string,
        public _id?: string
    ) { }
}

