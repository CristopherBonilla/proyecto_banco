import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
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
    private _clienteService: ClienteService,
    private _cuentaService: CuentaService,
    private _transferenciaService: TransferenciaService,
  ) { }

  ngOnInit(): void {
    //Mostrar el nombre del cliente que se logea
    this.extraerCliente();
      //Mostrar las cuentas asociadas al cliente
    this.extraerCuentas();
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

  extraerCuentas(){
    const cedula = history.state.cedula.cedula;
    const cuenta = {cedula: cedula};
    this._cuentaService.getCuentaByCI(cuenta).subscribe(data=>{
      //Convertir el valor de tipo de cuenta numerico a string
      var aux=data;
      for(var i=0;i<aux.length;i++){
        if(aux[i].tipo_cuenta=='10'){
          aux[i].tipo_cuenta='Cuenta de Ahorros';
          console
        }else{
          aux[i].tipo_cuenta='Cuenta Corriente';
        }
      }
      this.listCuentas=aux;
    }, error => {
      console.log(error);
    })
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
