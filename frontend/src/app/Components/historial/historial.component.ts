import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuentas';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { TransferenciaService } from 'src/app/services/trasferencia/trasferencia.service';
import { Transferencia } from 'src/app/models/transferencias';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent{
  listCuentas:Cuenta[]=[];
  transferencias: Transferencia[] = [];
  
  constructor(
    private router: Router, 
    private _cuentaService: CuentaService,
    private _transferenciaService: TransferenciaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.extraerCliente();
    this.obtenerHistorial();
  }
  extraerCliente() {
    const transferenciaObj = history.state.transferenciaObj;
    if (transferenciaObj && transferenciaObj.nombre) {
        const nombre = transferenciaObj.nombre;
        var text = document.getElementById('nombre-cliente');
        text!.innerHTML = nombre;
    } else {
        console.log('No se pudo obtener el nombre del cliente');
    }
}

  
  extraerCliente1(){
    const transferenciaObj = history.state.transferenciaObj;
    const nombre = transferenciaObj.nombre;
    var text = document.getElementById('nombre-cliente');
    text!.innerHTML = nombre;
  }
  
  obtenerHistorial() {
    const cedula = history.state.cedula;
    this._transferenciaService.getTransferenciasByCedula({ cedula }).subscribe(
      (data: Transferencia[]) => {
        this.transferencias = data;
      },
      error => {
        console.log('Error al obtener las transferencias', error);
      }
    );
    this.toastr.success('Historial obtenido', 'Historial obtenido');
  }
  

  // Puedes agregar una función para buscar por cédula si no deseas que se cargue al inicio
  buscarTransferencias() {
    this.obtenerHistorial();
  }

  transferenciasM(){
    const cedulaObj = history.state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = {cedula:cedulaObj, cuentas:cuentasObj}
    this.router.navigate(['/transferencia-interna'],{state:{transferenciaObj}});
  }

  misDatos(){
    const cedulaObj = history.state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = {cedula:cedulaObj, cuentas:cuentasObj}
    this.router.navigate(['/suspender-cliente'],{state:{transferenciaObj}});
  }

  menu() {
    const objeto = history.state.transferenciaObj;
    const cedulaObj = objeto.cedula;
    const cedula = { cedula: cedulaObj }
    this.router.navigate(['/menu'], { state: { cedula } });
  }
  
  
}
