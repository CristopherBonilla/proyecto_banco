import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transferencia } from 'src/app/models/transferencias';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private urlGuardarTransferencia = 'http://127.0.0.1:3600/guardar-transferencia';
  private urlGetTransferenciasByCedula = 'http://127.0.0.1:3600/get-transferencias-by-cedula';

  constructor(private http: HttpClient) {}

  /**
   * Guarda una transferencia en el sistema.
   * @param transferencia La transferencia a guardar.
   * @returns Observable con la respuesta del servidor.
   */
  guardarTransferencia(transferencia: Transferencia): Observable<any> {
    return this.http.post(this.urlGuardarTransferencia, transferencia);
  }

  /**
   * Obtiene las transferencias asociadas a una cédula.
   * @param cedula El número de cédula para buscar las transferencias.
   * @returns Observable con la lista de transferencias.
   */
  getTransferenciasByCedula(data: { cedula: number }): Observable<Transferencia[]> {
    return this.http.post<Transferencia[]>(this.urlGetTransferenciasByCedula, data);
  }
}

