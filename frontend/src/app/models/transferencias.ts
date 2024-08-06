export class Transferencia {
    _id?: number;
    cedula: number;
    cuenta_Emisor: string;
    cuenta_Destino: string;
    monto: number;
    descripcion: string;

    constructor(
        cedula: number,
        cuenta_Emisor: string,
        cuenta_Destino: string,
        monto: number,
        descripcion: string
    ) {
        this.cedula = cedula;
        this.cuenta_Emisor = cuenta_Emisor;
        this.cuenta_Destino = cuenta_Destino;
        this.monto = monto;
        this.descripcion = descripcion;
    }
}
