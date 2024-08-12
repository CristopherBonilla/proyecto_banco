export class Transferencia {
    _id?: string; // El tipo de _id suele ser un string en MongoDB
    cedula: number;
    cuenta_Emisor: string;
    cuenta_Destino: string;
    monto: number;
    descripcion: string;
    cedula_Emisor: number; // Nuevo campo para cédula del emisor
    cedula_Destinatario: number; // Nuevo campo para cédula del destinatario
    SaldoAnterios: number; // Nuevo campo para saldo anterior
    saldoActual: number; // Nuevo campo para saldo actual
    FechaTrasferencia: Date; // Nuevo campo para la fecha de transferencia

    constructor(
        cedula: number,
        cuenta_Emisor: string,
        cuenta_Destino: string,
        monto: number,
        descripcion: string,
        cedula_Emisor: number,
        cedula_Destinatario: number,
        SaldoAnterios: number,
        saldoActual: number,
        FechaTrasferencia: Date
    ) {
        this.cedula = cedula;
        this.cuenta_Emisor = cuenta_Emisor;
        this.cuenta_Destino = cuenta_Destino;
        this.monto = monto;
        this.descripcion = descripcion;
        this.cedula_Emisor = cedula_Emisor;
        this.cedula_Destinatario = cedula_Destinatario;
        this.SaldoAnterios = SaldoAnterios;
        this.saldoActual = saldoActual;
        this.FechaTrasferencia = FechaTrasferencia;
    }
}
