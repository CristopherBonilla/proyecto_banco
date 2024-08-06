import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cuenta } from "src/app/models/cuentas";
import { Transferencia } from "src/app/models/transferencias";

@Injectable({
    providedIn: 'root'

})
export class CuentaService {
    url = "http://127.0.0.1:3600/guardar-cuenta/";
    urlVerificar = "http://127.0.0.1:3600/validarNumeroCuenta/";
    urlGetCuentaByCI = "http://127.0.0.1:3600/get-Cuenta-byCI/";
    urlGenerarnumCuenta = "http://127.0.0.1:3600/generarNumero/";
    urlActualizarCuenta = "http://127.0.0.1:3600/actualizar-cuenta/"; 
    //urlTransferenciaInterna ="http://127.0.0.1:3600/transaccion-interna";
    urlTransferenciaInterna ="http://127.0.0.1:3600/guardar-transferencia";
    urlGetCuenta = "http://127.0.0.1:3600/getCuenta/"
    constructor(
        private http: HttpClient
    ) { }
    guardarCuenta(cuenta: Cuenta): Observable<any> {
        return this.http.post(this.url, cuenta);
    }
    validarCuenta(cuenta: Cuenta): Observable<any> {
        return this.http.post(this.urlVerificar, cuenta);
    }
    getCuentaByCI(cedula: Object):Observable<any>{
        return this.http.post(this.urlGetCuentaByCI, cedula);
    }
    generarNumCuenta(cuenta: Object):Observable<any>{
        return this.http.post(this.urlGenerarnumCuenta, cuenta);
    }
    actualizarCuenta(cuenta: object): Observable<any> {
        return this.http.post(this.urlActualizarCuenta, cuenta);
    }

    guardarTransferencia(transferencia: Transferencia): Observable<any> {
        return this.http.post(this.urlTransferenciaInterna, transferencia);
    }

    
    obtenerCuenta(numero:Object){
        return this.http.post(this.urlGetCuenta, numero);
    }

    
  
}
