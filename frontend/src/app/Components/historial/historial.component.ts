import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cuenta } from 'src/app/models/cuentas';
import { Transferencia } from 'src/app/models/transferencias';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { Router } from '@angular/router';
import { TransferenciaService } from 'src/app/services/trasferencia/trasferencia.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent{
  transferencias: Transferencia[] = [];
  listCuentas:Cuenta[]=[];
  
  constructor(
    private http: HttpClient, 
    private toastr: ToastrService,
    private router: Router, 
    private _clienteService: ClienteService,
    private _cuentaService: CuentaService,
    private _transferenciaService: TransferenciaService
  ) { }

  ngOnInit(): void {
    this.extraerCliente();
    // Llamar a la función para cargar las transferencias al inicializar el componente
    this.obtenerHistorial();
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

  obtenerHistorial() {
    this._transferenciaService.getTransferenciasByCedula({ cedula: history.state.cedula.cedula }).subscribe(
      (data: any[]) => {
        this.transferencias = data;
      },
      error => {
        console.log('Error al obtener las transferencias', error);
      }
    );
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
}
