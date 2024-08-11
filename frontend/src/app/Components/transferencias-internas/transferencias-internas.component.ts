import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuentas';
import { Transferencia } from 'src/app/models/transferencias';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';

@Component({
  selector: 'app-transferencias-internas',
  templateUrl: './transferencias-internas.component.html',
  styleUrls: ['./transferencias-internas.component.css']
})
export class TransferenciasInternasComponent {
  listCuentas:Cuenta[]=[];
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
     //Mostrar el nombre del cliente que se logea
     this.extraerCliente();
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

  validarCuenta1() {
    const cuenta = document.getElementById("cuentaDestino-campo") as HTMLInputElement;
    const cedulaDestino = (document.getElementById("cedulaDestino-campo") as HTMLInputElement).value;
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

  validarCuenta() {
    const cuenta = document.getElementById("cuentaDestino-campo") as HTMLInputElement;
    const cedulaDestino = (document.getElementById("cedulaDestino-campo") as HTMLInputElement).value;
    const cuentaObj = { numero_cuenta: cuenta.value };
    const texto = document.getElementById("textCuenta");
    
    this._CuentaService.obtenerCuenta(cuentaObj).subscribe(
      data => {
        if (data) { // Verifica si la cuenta es válida
          const cuentaData = data as Cuenta; // Asegúrate de que el tipo sea Cuenta

          // Verificar si la cédula ingresada pertenece al cliente de la cuenta destino
          const cedulaObj = { cedula: cedulaDestino };
          this._clienteService.obtenerCliente(cedulaObj).subscribe(clienteData => {
            if (clienteData && cuentaData.cedula === clienteData.cedula) {
              texto!.innerHTML = "Cuenta y cédula válidas. Esta cuenta le pertenece a: " + clienteData.nombres + " " + clienteData.apellidos;
              this.cuentaValida = true; // Habilitar el botón de "Enviar código" si la cuenta es válida
            } else {
              texto!.innerHTML = "La cédula no coincide con el propietario de la cuenta.";
              this.cuentaValida = false; // Deshabilitar el botón de "Enviar código"
              this.toastr.error('Cédula del destinatario no válida.', 'Error');
            }
          });

        } else {
          this.cuentaValida = false; // Deshabilitar el botón de "Enviar código"
          texto!.innerHTML = "Cuenta no encontrada";
          this.toastr.error('Cuenta de destino no válida.', 'Error');
        }
      },
      error => {
        this.cuentaValida = false; // Deshabilitar el botón de "Enviar código"
        texto!.innerHTML = "Cuenta no encontrada";
        this.toastr.error('Cuenta de destino no válida.', 'Error');
      }
    );
  }

  
  transferir() {
    const monto = parseFloat((document.getElementById("monto-campo") as HTMLInputElement).value);
    const c1 = (document.getElementById("cuentasOrigen") as HTMLSelectElement).value;
    const cuenta2 = (document.getElementById("cuentaDestino-campo") as HTMLInputElement).value;
    const descripcion = (document.getElementById("descripcion-campo") as HTMLInputElement).value;
    
    // Encuentra la cuenta origen correspondiente
    const cuentaOrigenData = this.cuentas.find(cuenta => 
        `${cuenta.tipo_cuenta} ${cuenta.numero_cuenta} Saldo Actual: $${cuenta.monto_inicial}` === c1
    );

    if (cuentaOrigenData) {
        if (monto > cuentaOrigenData.monto_inicial) {
            // Mostrar mensaje de saldo insuficiente usando Toastr
            this.toastr.error('Saldo insuficiente para realizar esta transferencia.', 'Error');
            return; // Detener la ejecución si el saldo es insuficiente
        }
        if (monto < 0.00) {
            // Mostrar mensaje de monto incorrecto
            this.toastr.error('Ingrese un monto correcto', 'Error');
            return; 
        }

        // Preparar los datos para la transferencia
        const transferencia: Transferencia = { 
            cedula: cuentaOrigenData.cedula,
            cuenta_Emisor: cuentaOrigenData.numero_cuenta,
            cuenta_Destino: cuenta2,
            monto: monto,
            descripcion: descripcion,
            cedula_Emisor: cuentaOrigenData.cedula, // Agregado
            cedula_Destinatario: parseInt(cuenta2), // Necesitarías obtener cédula del destinatario
            SaldoAnterios: cuentaOrigenData.monto_inicial,
            saldoActual: cuentaOrigenData.monto_inicial - monto,
            FechaTrasferencia: new Date() 
        };

        // Realizar la transferencia
        this._CuentaService.guardarTransferencia(transferencia).subscribe(data => {
            console.log(data);
            this.toastr.success('La transferencia se realizó con éxito.', 'Transferencia exitosa');
            setTimeout(() => {
                this.menu();
            }, 100);
        });

        // Enviar resumen
        const resumen = { cuenta1: cuentaOrigenData.numero_cuenta, cuenta2: cuenta2, monto: monto, descripcion: descripcion, correo: this.correo };
        this._clienteService.resumen(resumen).subscribe(data => {
            console.log(data);
        });
    } else {
        // Si no se encuentra la cuenta origen
        this.toastr.error('Cuenta de origen no válida.', 'Error');
    }
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

  menu() {
    const objeto = history.state.transferenciaObj;
    const cedulaObj = objeto.cedula;
    const cedula = { cedula: cedulaObj }
    this.router.navigate(['/menu'], { state: { cedula } });
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
