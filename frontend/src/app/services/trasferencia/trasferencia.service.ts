import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transferencia } from 'src/app/models/transferencias';
import { Cliente } from "src/app/models/clientes";

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  urlGuardarTransferencia = 'http://127.0.0.1:3600/guardar-transferencia';
  urltransferencias = 'http://127.0.0.1:3600/transferencias';
  urlGetTransferenciasByCedula = 'http://127.0.0.1:3600/get-transferencias-by-cedula';
  urlObtenerCliente = "http://127.0.0.1:3600/cliente/";
  url = "http://127.0.0.1:3600/guardar-cliente/";
  constructor(
    private http: HttpClient
  ) {}
  guardarTransferencia(transferencia: Transferencia): Observable<any> {
    return this.http.post(this.urlGuardarTransferencia, transferencia);
  }

  getTransferenciasByCedula(cedula: { cedula: number }): Observable<any> {
    return this.http.post(this.urlGetTransferenciasByCedula, cedula);
  }
  obtenerCliente(cedula:object):Observable<any>{
    return this.http.post(this.urlObtenerCliente, cedula);
  }
  guardarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.url, cliente);
  }
}

