import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuentas';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';

@Component({
  selector: 'app-transferencias-internas',
  templateUrl: './transferencias-internas.component.html',
  styleUrls: ['./transferencias-internas.component.css']
})
export class TransferenciasInternasComponent {
  cuentas: Cuenta[] = [];
  numeroCuentas: string[] = [];
  numeroCuentas2: string[] = [];
  correo: string = ""; // Cambiar a tipo primitivo string
  codigoValido: boolean = false;
  cuentaValida: boolean = false; // Estado de validez de la cuenta de destino
  codigoOTP: string = ""; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _clienteService: ClienteService,
    private _CuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    // Mostrar el nombre del cliente que se logea
    this.extraerDatos();
  }

  extraerDatos() {
    const objeto = history.state.transferenciaObj;
    const cedula = objeto.cedula;
    this.cuentas = objeto.cuentas;
    const nombre = { cedula: cedula };
    this._clienteService.obtenerCliente(nombre).subscribe(data => {
      this.correo = data.correo_electronico;
      const nombres = data.nombres.toString();
      const apellidos = data.apellidos.toString();
      const text = document.getElementById('nombre-cliente');
      text!.innerHTML = nombres + ' ' + apellidos;
    })
    for (let i = 0; i < this.cuentas.length; i++) {
      this.numeroCuentas[i] = this.cuentas[i].tipo_cuenta + " " + this.cuentas[i].numero_cuenta +
      " Saldo Actual: $" + this.cuentas[i].monto_inicial;
      // cargar cuentas en el combo box
    }
    const select = document.getElementById("cuentasOrigen") as HTMLSelectElement;
    for (let i = 0; i < this.numeroCuentas.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = this.numeroCuentas[i];
      select!.appendChild(option);
    }
  }


  menu() {
    const objeto = history.state.transferenciaObj;
    const cedulaObj = objeto.cedula;
    const cedula = { cedula: cedulaObj }
    this.router.navigate(['/menu'], { state: { cedula } });
  }

  transferencias() {
    const cedulaObj = history.state.transferenciaObj.cedula;
    const cuentasObj = history.state.transferenciaObj.cuentas;
    const transferenciaObj = { cedula: cedulaObj, cuentas: cuentasObj }
    this.router.navigate(['/transferencia'], { state: { transferenciaObj } });
  }

  validarCuenta() {
    const cuenta = document.getElementById("cuentaDestino-campo") as HTMLInputElement;
    const cuentaObj = { numero_cuenta: cuenta.value };
    const texto = document.getElementById("textCuenta");
    
    this._CuentaService.obtenerCuenta(cuentaObj).subscribe(
      data => {
        if (data) { // Verifica si la cuenta es valida
          const cuentaData = data as Cuenta; // Asegúrate de que el tipo sea Cuenta
          const cedulaObj = { cedula: cuentaData.cedula };
          
          this._clienteService.obtenerCliente(cedulaObj).subscribe(clienteData => {
            texto!.innerHTML = "Cuenta encontrada. Esta cuenta le pertenece a: " + clienteData.nombres + " " + clienteData.apellidos;
            this.cuentaValida = true; // Habilitar el botón de "Enviar código" si la cuenta es válida
          });
        } else {
          // Manejar el caso en que la cuenta no tenga una cédula válida
          this.cuentaValida = false; // Deshabilitar el botón de "Enviar código"
          texto!.innerHTML = "Cuenta no encontrada";
          this.toastr.error('Cuenta de destino no válida.', 'Error');
        }
      },
      error => {
        // Manejar el caso en que la cuenta no existe o hay un error en la solicitud
        this.cuentaValida = false; // Deshabilitar el botón de "Enviar código"
        texto!.innerHTML = "Cuenta no encontrada ";
        this.toastr.error('Cuenta de destino no válida.', 'Error');
      }
    );
  }
  
  transferir(){
    var cuenta1:String="";
    var monto = document.getElementById("monto-campo") as HTMLInputElement;
    var c1 =  document.getElementById("cuentasOrigen")as HTMLInputElement;
    var cuenta2 = document.getElementById("cuentaDestino-campo") as HTMLInputElement;
    var descripcion=document.getElementById("descripcion-campo") as HTMLInputElement;
    for(var i=0; i<this.cuentas.length; i++){
      if(this.numeroCuentas[i]==c1.value){
        cuenta1 = this.cuentas[i].numero_cuenta;
        break;
      }
    }
  const transferir = {cuenta1: cuenta1, cuenta2: cuenta2.value, monto:monto.value };
    this._CuentaService.transaccionInterna(transferir).subscribe(data =>{
      console.log(data);
      this.toastr.success('La transferencia se realizó con éxito.', 'Transferencia exitosa');
      setTimeout(() => {
        this.menu();
      }, 1000); 
    });
    const resumen = { cuenta1: cuenta1, cuenta2: cuenta2.value, monto: monto.value, descripcion: descripcion.value, correo: this.correo };
    this._clienteService.resumen(resumen).subscribe(data => {
      console.log(data);
    })
  } 
             

  otp() {
    // Deshabilitar el botón de correo
    document.getElementById('boton-correo')!.style.display = 'none';
    document.getElementById('otp')!.style.display = 'block';
    // Enviar correo
    this.confirmarCorreo(this.correo);
    this.toastr.success('Código enviado correctamente al correo', 'Éxito');
  }
  enviarCodigo() {
    this.toastr.success('Código enviado correctamente al correo', 'Éxito');
    this.confirmarCorreo(this.correo);
    
  }

  reenviarCodigo(event: Event) {
    event.preventDefault(); // Prevenir comportamiento por defecto del enlace
    this.enviarCodigo();
  }

  confirmarCorreo(email: string) {
    let codigo = "";
    const correo = { correo: email };
    this._clienteService.confirmarTransferencia(correo).subscribe(
      data => {
        codigo = data.toString();
        const patron = "^" + codigo + "$";
        const campo = document.getElementById('otp-campo');
        campo!.addEventListener('keyup', () => {
          const text = document.getElementById('text');
          const otp = document.getElementById("otp-campo") as HTMLInputElement;
          if (otp.value.match(patron) == null) {
            text!.innerHTML = "Codigo invalido";
            this.codigoValido = false;
          } else {
            text!.innerHTML = "Codigo valido";
            this.codigoValido = true;
          }
        });
      }
    );
  }
}
