export class Util {
    static equiv( source, target ) {
        return source === target;
    }

    static toJson( data: string ) {
        return JSON.parse( data );
    }

    static toStr( data: any ) {
        return JSON.stringify( data );
    }

    static isEmpty( data: any ) {
        if ( data.constructor === String ) {
            return (String(data)).length === 0;
        }
    }

}
