import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { HistoryService } from 'src/app/services/history.service';
import { Cuenta } from 'src/app/models/cuentas';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  listCuentas: Cuenta[] = [];
  esEncriptado = false;

  constructor(
    private router: Router,
    private _clienteService: ClienteService,
    private _cuentaService: CuentaService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.esEncriptado = JSON.parse(localStorage.getItem('esEncriptado') || 'false');
    this.extraerCliente();
    this.extraerCuentas();
  }

  extraerCliente() {
    const state = this.historyService.getState();
    const cedula = state.cedula.cedula;
    const nombre = { cedula: cedula };
    this._clienteService.obtenerCliente(nombre).subscribe(data => {
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML = nombres + ' ' + apellidos;
      console.log('No se pudo obtener el nombre del cliente');
    });
  }

  extraerCuentas() {
    const state = this.historyService.getState();
    const cedula = state.cedula.cedula;
    const cuenta = { cedula: cedula };
    this._cuentaService.getCuentaByCI(cuenta).subscribe(data => {
      var aux = data;
      for (var i = 0; i < aux.length; i++) {
        if (aux[i].tipo_cuenta == '10') {
          aux[i].tipo_cuenta = 'Cuenta de Ahorros';
        } else {
          aux[i].tipo_cuenta = 'Cuenta Corriente';
        }
      }
      this.listCuentas = aux;
    }, error => {
      console.log(error);
    });
  }

  encriptarSaldo(monto: number | string): string {
    const montoNum = typeof monto === 'string' ? parseFloat(monto) : monto;
    return montoNum.toString().replace(/\d/g, '•');
  }

  toggleEncriptado() {
    this.esEncriptado = !this.esEncriptado;
    localStorage.setItem('esEncriptado', JSON.stringify(this.esEncriptado));
  }

  transferencias() {
    const state = this.historyService.getState();
    const cedulaObj = state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = { cedula: cedulaObj, cuentas: cuentasObj };
    this.router.navigate(['/transferencia-interna'], { state: { transferenciaObj } });
  }

  misDatos() {
    const state = this.historyService.getState();
    const cedulaObj = state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = { cedula: cedulaObj, cuentas: cuentasObj };
    this.router.navigate(['/suspender-cliente'], { state: { transferenciaObj } });
  }

  verHistorial() {
    const state = this.historyService.getState();
    const cedulaObj = state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const nombreCliente = document.getElementById('nombre-cliente')?.innerText || '';
    const transferenciaObj = { cedula: cedulaObj, cuentas: cuentasObj, nombre: nombreCliente };
    this.router.navigate(['/historial'], { state: { cedula: cedulaObj, transferenciaObj } });
  }
}


/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cuenta } from 'src/app/models/cuentas';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})


export class MenuPrincipalComponent {
  listCuentas:Cuenta[]=[];
  esEncriptado = false; // Propiedad para manejar el estado de encriptación

  constructor(
    private router: Router, 
    private _clienteService: ClienteService,
    private _cuentaService: CuentaService,
  ){}

  ngOnInit(): void {
    this.esEncriptado = JSON.parse(localStorage.getItem('esEncriptado') || 'false');
    
    // Verifica si history.state.cedula existe
    if (history.state.cedula && history.state.cedula.cedula) {
      this.extraerCliente();
      this.extraerCuentas();
    } else {
      console.error('No se encontró información de cédula en el estado de la historia');
    }
  }
  
  extraerCliente() {
    if (history.state.cedula && history.state.cedula.cedula) {
      const cedula = history.state.cedula.cedula;
      const nombre = { cedula: cedula };
      this._clienteService.obtenerCliente(nombre).subscribe(data => {
        const nombres = data.nombres.toString();
        const apellidos = data.apellidos.toString();
        const text = document.getElementById('nombre-cliente');
        if (text) {
          text.innerHTML = `${nombres} ${apellidos}`;
        }
      }, error => {
        console.error('Error al obtener el cliente', error);
      });
    }
  }
  
  extraerCuentas() {
    if (history.state.cedula && history.state.cedula.cedula) {
      const cedula = history.state.cedula.cedula;
      const cuenta = { cedula: cedula };
      this._cuentaService.getCuentaByCI(cuenta).subscribe(data => {
        const aux = data;
        for (let i = 0; i < aux.length; i++) {
          aux[i].tipo_cuenta = aux[i].tipo_cuenta === '10' ? 'Cuenta de Ahorros' : 'Cuenta Corriente';
        }
        this.listCuentas = aux;
      }, error => {
        console.error('Error al obtener cuentas', error);
      });
    }
  }
  




/*
  ngOnInit(): void {
    this.esEncriptado = JSON.parse(localStorage.getItem('esEncriptado') || 'false');
    //Mostrar el nombre del cliente que se logea
    this.extraerCliente();
    //Mostrar las cuentas asociadas al cliente
    this.extraerCuentas();
   
  }

    extraerCliente(){
    const cedula = history.state.cedula.cedula;
    const nombre = {cedula: cedula};
    this._clienteService.obtenerCliente(nombre).subscribe(data=>{
      var nombres = data.nombres.toString();
      var apellidos = data.apellidos.toString();
      var text = document.getElementById('nombre-cliente');
      text!.innerHTML= nombres+' '+apellidos;
      console.log('No se pudo obtener el nombre del cliente');
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
*/




  /*encriptarSaldo(monto: number | string): string {
    // Asegúrate de que el monto es un número
    const montoNum = typeof monto === 'string' ? parseFloat(monto) : monto;
    // Convertir el monto a una cadena de puntos
    return montoNum.toString().replace(/\d/g, '•');
  }

  toggleEncriptado() {
      this.esEncriptado = !this.esEncriptado; // Alterna el estado de encriptado
      localStorage.setItem('esEncriptado', JSON.stringify(this.esEncriptado));
    }

  transferencias(){
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

  verHistorial(){
    const cedulaObj = history.state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const nombreCliente = document.getElementById('nombre-cliente')?.innerText || ''; // Obtener el nombre del cliente desde el DOM
    const transferenciaObj  = {cedula:cedulaObj, cuentas:cuentasObj, nombre: nombreCliente}; // Agregar el nombre del cliente
    this.router.navigate(['/historial'], { state: { cedula: cedulaObj, transferenciaObj } });
  }
  
  }


*/