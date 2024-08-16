import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencias-internas-resumen',
  templateUrl: './transferencias-internas-resumen.component.html',
  styleUrls: ['./transferencias-internas-resumen.component.css']
})
export class TransferenciasInternasResumenComponent implements OnInit {
  transferenciaObj: any = {}; // Inicializa transferenciaObj para evitar errores

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Obtener el estado de la navegación si está disponible
    this.transferenciaObj = history.state.transferenciaObj || {};
    this.extraerDatos();
  }

  extraerDatos() {
    if (this.transferenciaObj && this.transferenciaObj.cliente) {
      // Lógica para procesar transferenciaObj
    } else {
      console.error('transferenciaObj o cliente no está disponible');
    }
  }
}




/*
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cuenta } from 'src/app/models/cuentas';


@Component({
  selector: 'app-transferencias-internas-resumen',
  templateUrl: './transferencias-internas-resumen.component.html',
  styleUrls: ['./transferencias-internas-resumen.component.css']
})
export class TransferenciasInternasResumenComponent {
  transferenciaObj: any;
  resumenHTML: string = '';
  cuentas: Cuenta[] = [];
  numeroCuentas: string[] = [];
  correo: String = "";

  constructor(
    private router: Router,
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.extraerDatos();
    this.transferenciaObj = history.state.transferenciaObj;
    this.generarResumenHTML();
   
  }

  generarResumenHTML(): void {
    if (this.transferenciaObj) {
      const { cuenta1, cuenta2, monto, descripcion } = this.transferenciaObj;
      
      const fechaTransferencia = new Date().toLocaleString('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      });
      
      this.resumenHTML = `
        <p><strong>Cuenta Origen:</strong> ${cuenta1}</p>
        <p><strong>Cuenta Destino:</strong> ${cuenta2}</p>
        <p><strong>Monto:</strong> ${monto}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
      `;
    }
  }

  extraerDatos() {
    const objeto = history.state.transferenciaObj;
    var cedula = objeto.cedula;
    this.cuentas = objeto.cuentas;
    const nombre = { cedula: cedula };
    this._clienteService.obtenerCliente(nombre).subscribe(data => {
      this.correo = data.correo_electronico;
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML = nombres + ' ' + apellidos;
    });
  }

  extraerCliente(){
    const cedula = history.state.cedula.cedula;
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML= nombres+' '+apellidos;
    })
  }

  

  menu() {
    const objeto = history.state.transferenciaObj;
    const cedulaObj = objeto.cedula;
    const cedula = { cedula: cedulaObj }
    this.router.navigate(['/menu'], { state: { cedula } });
  }

  mostrarResumen(): void {
    console.log(this.transferenciaObj);
    const resumen = {
      cuenta1: this.transferenciaObj.cuenta1,
      cuenta2: this.transferenciaObj.cuenta2,
      monto: this.transferenciaObj.monto,
      descripcion: this.transferenciaObj.descripcion,
      correo: this.transferenciaObj.correo
    };
    this._clienteService.resumen(resumen).subscribe(data => {
      console.log(data);
    });
  }
}

*/
