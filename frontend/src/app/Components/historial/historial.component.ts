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
  transferenciasOriginales: Transferencia[] = [];

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
  
  obtenerHistorial() {
    const cedula = history.state.cedula;
    
    if (cedula) {
      this._transferenciaService.getTransferenciasByCedula({ cedula }).subscribe(
        (data: Transferencia[]) => {
          // Log para verificar datos
          console.log('Transferencias obtenidas:', data);
          //this.transferencias = data;
          this.transferenciasOriginales = [...data]; // Guarda una copia de las transacciones originales
          this.transferencias = [...data]; // Inicialmente muestra todas las transacciones
    
        },
        error => {
          console.log('Error al obtener las transferencias', error);
          
        }
      );
    } else {
      console.log('No se recibió una cédula en el estado de la historia');
    }
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

    ordenarTransferencias(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    if (selectElement) {
      const selectedValue = selectElement.value;

      // Resetea la lista de transferencias a las originales antes de aplicar cualquier filtro u ordenamiento
      this.transferencias = [...this.transferenciasOriginales];

      // Aplica los filtros u ordenamientos según la selección
      switch (selectedValue) {
        case 'hechas':
          this.transferencias = this.transferencias.filter(t => this.isTransferenciaHecha(t));
          break;
        case 'recibidas':
          this.transferencias = this.transferencias.filter(t => this.isTransferenciaRecibida(t));
          break;
        case 'fechaAsc':
          this.transferencias.sort((a, b) => new Date(a.FechaTrasferencia).getTime() - new Date(b.FechaTrasferencia).getTime());
          break;
        case 'fechaDesc':
          this.transferencias.sort((a, b) => new Date(b.FechaTrasferencia).getTime() - new Date(a.FechaTrasferencia).getTime());
          break;
        default:
          break;
      }
    }
  }
   
    isTransferenciaHecha(transferencia: Transferencia): boolean {
    return transferencia.cedula_Emisor === history.state.cedula;
  }

  isTransferenciaRecibida(transferencia: Transferencia): boolean {
    return transferencia.cedula_Destinatario === history.state.cedula;
  }

      
}
