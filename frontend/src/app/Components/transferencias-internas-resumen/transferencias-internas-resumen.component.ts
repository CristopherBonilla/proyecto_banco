import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencias-internas-resumen',
  templateUrl: './transferencias-internas-resumen.component.html',
  styleUrls: ['./transferencias-internas-resumen.component.css']
})
export class TransferenciasInternasResumenComponent implements OnInit {
  clienteNombre: string = '';
  resumenTransferencia: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const transferenciaObj = navigation.extras.state['transferenciaObj'];
      if (transferenciaObj) {
        this.clienteNombre = `${transferenciaObj.nombre} ${transferenciaObj.apellidos}`;  // Ajusta esto según cómo recibas los datos
        this.resumenTransferencia = `Cuenta Origen: ${transferenciaObj.cuenta1} <br>
                                     Cuenta Destino: ${transferenciaObj.cuenta2} <br>
                                     Monto: ${transferenciaObj.monto} <br>
                                     Descripción: ${transferenciaObj.descripcion}`; // Ajusta según los datos
      }
    }
  }
}
