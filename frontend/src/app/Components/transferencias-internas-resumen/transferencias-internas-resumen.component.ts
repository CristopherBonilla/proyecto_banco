import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencias-internas-resumen',
  templateUrl: './transferencias-internas-resumen.component.html',
  styleUrls: ['./transferencias-internas-resumen.component.css']
})
export class TransferenciasInternasResumenComponent implements OnInit {
  @ViewChild('resumeTransferencia') resumenTransfer!: ElementRef;
  transferenciaObj: any;

  constructor(
    private renderer2: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.transferenciaObj = navigation && navigation.extras && navigation.extras.state ? navigation.extras.state['transferenciaObj'] : null;
    
    if (this.transferenciaObj) {
      this.MostrarDatos();
    } else {
      console.error('No transfer object found in navigation state');
    }
  }

  MostrarDatos(){
    if (!this.transferenciaObj) {
      return;
    }

    const resumen = this.resumenTransfer.nativeElement;

    this.renderer2.setProperty(resumen, 'innerHTML', `
      Cuenta Origen: ${this.transferenciaObj.cuenta1}<br>
      Cuenta Destino: ${this.transferenciaObj.cuenta2}<br>
      Monto: ${this.transferenciaObj.monto}<br>
      Descripción: ${this.transferenciaObj.descripcion}<br>
      Correo: ${this.transferenciaObj.correo}
    `);
  }
}
