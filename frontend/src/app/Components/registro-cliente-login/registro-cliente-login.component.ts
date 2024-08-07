import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { Cuenta } from 'src/app/models/cuentas';
import { Usuario } from 'src/app/models/usuarios';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { UsuarioService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-registro-cliente-login',
  templateUrl: './registro-cliente-login.component.html',
  styleUrls: ['./registro-cliente-login.component.css']
})
export class RegistroClienteLoginComponent {

  formularioCliente: FormGroup;
  formularioCuenta: FormGroup;
  formularioUsuario: FormGroup;
  public showform1 = true;
  public showform2 = false;
  public showform3 = false;

  public username = "";
  public password = "";
  @ViewChild('spanNumCuenta') cuenta!: ElementRef;
  @ViewChild('botonPregunta') pregunta!: ElementRef;
  @ViewChild('infoCuenta') infoCuenta!: ElementRef;

  public otpNotOk = true;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private renderer2: Renderer2,
    private router: Router,
    private _clienteService: ClienteService,
    private _cuentaService: CuentaService,
    private _credendialesService: UsuarioService,
  ) {
    // Cliente
    this.formularioCliente = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern("^([A-Za-zñáéíóúÁÉÍÓÚ']+( [A-Za-zñáéíóúÁÉÍÓÚ'])*)*$")]], //regex valida palabas y palabras unidas por un espacio
      apellidos: ['', [Validators.required, Validators.pattern("^([A-Za-zñáéíóúÁÉÍÓÚ']+( [A-Za-zñáéíóúÁÉÍÓÚ'])*)*$")]],
      cedula: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      codDactilar: ['', [Validators.required, Validators.pattern("^([A-Za-z]{1}[0-9]{4}){2}$")]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domicilio: ['', [Validators.required, Validators.pattern("^[A-Za-zñáéíóúÁÉÍÓÚ' ]{1,50}$")]],
      ocupacion: ['', [Validators.required, Validators.pattern("^[A-Za-zñáéíóúÁÉÍÓÚ' ]{1,50}$")]],
      numeroTelefono: ['', [Validators.required, Validators.pattern("^09[0-9]{8}$")]],
      otp: ['', Validators.required]
    });
    // Cuenta
    this.formularioCuenta = this.fb.group({
      tipo_cuenta: ['', Validators.required],
      monto_inicial: ['0', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],  // Inicializa el monto inicial con 0
      ingreso_promedio: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      numero_cuenta: ['', Validators.required],
    });
    // Usuario
    this.formularioUsuario = this.fb.group({
      pregunta: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{1,25}$')]],
    });
  }

  corriente() {
    // 20 para corriente
    const numCuenta = this.cuenta.nativeElement;
    let cuenta = {
      ahorro: false,
      digitos: 12
    }
    this._cuentaService.generarNumCuenta(cuenta).subscribe(
      data => {
        this.renderer2.setProperty(numCuenta, 'innerHTML', data.numero);
        this.formularioCuenta.patchValue({ tipo_cuenta: '20' });
        this.formularioCuenta.patchValue({ numero_cuenta: data.numero });
      });
  }

  ahorros() {
    // 10 para ahorros
    const numCuenta = this.cuenta.nativeElement;
    let cuenta = {
      ahorro: true,
      digitos: 12
    }
    this._cuentaService.generarNumCuenta(cuenta).subscribe(
      data => {
        this.renderer2.setProperty(numCuenta, 'innerHTML', data.numero);
        this.formularioCuenta.patchValue({ tipo_cuenta: '10' });
        this.formularioCuenta.patchValue({ numero_cuenta: data.numero });
      });
  }

  // Getters
  get fCliente() { return this.formularioCliente.controls }

  // Habilitar boton de correo
  otp() {
    if (this.formularioCliente.get('email')?.valid) {
      var correo = this.formularioCliente.get('email')?.value;

      // Deshabilitar el botón de correo
      document.getElementById('boton-correo')!.style.display = 'none';
      document.getElementById('otp')!.style.display = 'block';
      // Enviar correo
      this.verificarCorreo(correo);
    }
  }

  agregarCliente() {
    const CLIENTE: Cliente = {
      nombres: this.formularioCliente.get('nombres')?.value,
      apellidos: this.formularioCliente.get('apellidos')?.value,
      cedula: this.formularioCliente.get('cedula')?.value,
      codigo_dactilar: this.formularioCliente.get('codDactilar')?.value,
      fecha_nacimiento: this.formularioCliente.get('fechaNacimiento')?.value,
      correo_electronico: this.formularioCliente.get('email')?.value,
      direccion: this.formularioCliente.get('domicilio')?.value,
      ocupacion: this.formularioCliente.get('ocupacion')?.value,
      numero_telefono: this.formularioCliente.get('numeroTelefono')?.value,
      // State define si el usuario está activo => true o pasivo => false
      state: true
    }

    // Envío de datos
    if (this.formularioCliente.valid) {
      this.verificarCliente(CLIENTE);
      console.log('VALID')
      // Llamar función BD
    } else {
      console.log('INVALID')
      this.guardarCliente(CLIENTE);
    }
  }

  printCuenta(cuenta: Cuenta) {
    let salida = "-".repeat(20);
    salida = salida + '<br>' +
      "Número de cuenta: " + cuenta.numero_cuenta + '<br>' +
      "Cédula: " + cuenta.cedula + '<br>';
    if (cuenta.tipo_cuenta == '10') {
      salida = salida +
        "Tipo de cuenta: Ahorros" + '<br>';
    } else if (cuenta.tipo_cuenta == '20') {
      salida = salida +
        "Tipo de cuenta: Corriente" + '<br>';
    }
    salida = salida +
      "Monto: " + cuenta.monto_inicial + '<br>' +
      "Ingresos promedio del cliente: " + cuenta.ingreso_promedio + '<br>';
    if (cuenta.state) {
      salida = salida +
        "Estado de la cuenta: Activo" + '<br>';
    } else {
      salida = salida +
        "Estado de la cuenta: Pasivo" + '<br>';
    }
    salida = salida + "-".repeat(20);
    return salida;
  }

  agregarCuenta() {
    let salida: string;
    const CUENTA: Cuenta = {
      cedula: this.formularioCliente.get('cedula')?.value,
      tipo_cuenta: this.formularioCuenta.get('tipo_cuenta')?.value,
      monto_inicial: this.formularioCuenta.get('monto_inicial')?.value || 0,  // Asegura que el monto inicial sea al menos 0
      ingreso_promedio: this.formularioCuenta.get('ingreso_promedio')?.value,
      numero_cuenta: this.formularioCuenta.get('numero_cuenta')?.value,
      // State define si el usuario está activo => true o pasivo => false
      state: true
    }
    console.log("Cuenta: " + CUENTA);

    // Mostramos info de la cuenta
    const info = this.infoCuenta.nativeElement;
    salida = this.printCuenta(CUENTA);
    this.renderer2.setProperty(info, 'innerHTML', salida);

    // Crear un usuario y contraseña
    this.username = this.formularioCliente.get('nombres')?.value.split(' ')[0] + this.formularioCliente.get('cedula')?.value.substring(0, 6);
    this.password = this.formularioCliente.get('nombres')?.value.split(' ')[1] + this.formularioCliente.get('cedula')?.value.substring(0, 6)

    // Envío de datos
    if (this.formularioCuenta.valid) {
      console.log('VALID');
      this.guardarCuenta(CUENTA);
    } else {
      console.log('INVALID');
      this.guardarCuenta(CUENTA);
    }
  }

  agregarUsuario() {
    const USUARIO: Usuario = {
      cedula: this.formularioCliente.get('cedula')?.value,
      username: this.formularioCliente.get('nombres')?.value.split(' ')[0] + this.formularioCliente.get('cedula')?.value.substring(0, 6),
      password: this.formularioCliente.get('nombres')?.value.split(' ')[1] + this.formularioCliente.get('cedula')?.value.substring(0, 6) + "@A",
      pregunta: this.formularioUsuario.get('pregunta')?.value,
      isNew: true
    }
    console.log(USUARIO);
    // Envío de datos
    if (this.formularioUsuario.valid) {
      console.log('VALID');
      this.guardarUsuario(USUARIO);
    } else {
      console.log('INVALID');
      this.guardarUsuario(USUARIO);
    }
  }

  pregunta1() {
    const pregunta_seg = this.pregunta.nativeElement;
    this.renderer2.setProperty(pregunta_seg, 'innerHTML', '¿Cu&aacute;l es tu sabor de helado favorito?');
  }

  // CRUD
  guardarCliente(cliente: Cliente) {
    console.log(cliente);
    this._clienteService.guardarCliente(cliente).subscribe(
      data => {
        switch (data.message) {
          case (200): {
            this.toastr.info('El Cliente se registró con éxito!', 'Cliente registrado');
            console.log("Todo bien mi 🔑, el dato si se ingresó, re piola rey!");
            this.showform1 = false;
            this.showform2 = true;
            this.showform3 = false;
            break;
          }
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario', 'Cliente no registrado');
            console.log("No se guardó el dato mi 🔑");
            break;
          }
        }
      }
    )
  }

  guardarCuenta(cuenta: Cuenta) {
    console.log(cuenta);
    this._cuentaService.guardarCuenta(cuenta).subscribe(
      data => {
        console.log(data.message)
        switch (data.message) {
          case (200): {
            this.toastr.info('La cuenta se registró con éxito!', 'Cuenta registrada');
            console.log("Todo bien mi 🔑, el dato si se ingresó, re piola rey!");
            this.showform2 = false;
            this.showform1 = false;
            this.showform3 = true;
            break;
          }
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD404', 'Cuenta no registrada');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD500', 'Cuenta no registrada');
            console.log("No se guardó el dato mi 🔑");
            break;
          }
        }
      }
    )
  }

  guardarUsuario(credenciales: Usuario) {
    console.log(credenciales);
    this._credendialesService.verificarUsuario(credenciales).subscribe(
      data => {
        console.log(data.message)
        switch (data.message) {
          case (200): {
            this.toastr.info('El usuario se registró con éxito!', 'Usuario registrado');
            console.log("Todo bien mi 🔑, el dato si se ingresó, re piola rey!");
            this.router.navigate(['/login']);
            this.showform1 = true;
            this.showform2 = false;
            this.showform3 = false;
            break;
          }
          case (404): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD404', 'Usuario no registrado');
            console.log("Error del servidor mi 🔑");
            break;
          }
          case (500): {
            this.toastr.error('Revisa las entradas ingresadas en el formulario: COD500', 'Usuario no registrado');
            console.log("No se guardó el dato mi 🔑");
            break;
          }
        }
      }
    )
  }

  verificarCliente(cliente: Cliente) {
    console.log(cliente);
    this._clienteService.validarCliente(cliente).subscribe(
      data => {
        if (data == true) {
          //El cliente(cedula) existe en la base de datos
          this.toastr.error('El CI de este cliente ya existe dentro de la base de datos, no se puede crear un usuario duplicado.', 'El cliente ya existe!');
        } else {
          //El cliente(cedula) es nuevo, no existe en la base de datos
          this.guardarCliente(cliente);
        }
      }
    )
  }

  verificarCuenta(cuenta: Cuenta) {
    console.log(cuenta);
    this._cuentaService.validarCuenta(cuenta).subscribe(
      data => {
        if (data == true) {
          //El cliente(cedula) existe en la base de datos
          this.toastr.error('Este n&uacute;mero de cuenta ya existe dentro de la base de datos, no se puede crear una cuenta duplicada.', 'La cuenta ya existe!');
        } else {
          //El cliente(cedula) es nuevo, no existe en la base de datos
          this.guardarCuenta(cuenta);
        }
      }
    )
  }

  verificarCorreo(email: String) {
    var codigo = "";
    const correo = { correo: email }
    this._clienteService.validarCorreo(correo).subscribe(
      data => {
        codigo = data.toString();
        let patron = "^" + codigo + "$";
        var campo = document.getElementById('otp-campo');
        campo!.addEventListener('keyup', () => {
          var text = document.getElementById('text');
          var otp = this.formularioCliente.get('otp')!.value;
          console.log(patron);
          console.log(otp);
          if (otp.match(patron) == null) {
            text!.innerHTML = "Código inválido"
            this.otpNotOk = true;
          } else {
            text!.innerHTML = "Código válido"
            this.otpNotOk = false;
          }
        })
      }
    )
  }

  ngOnInit(): void {
    // Código de inicialización
  }

  registroExitoso() {
    var correo = this.formularioCliente.get('email')?.value;
    var username = this.formularioCliente.get('nombres')?.value.split(' ')[0] + this.formularioCliente.get('cedula')?.value.substring(0, 6);
    var pass = this.formularioCliente.get('nombres')?.value.split(' ')[1] + this.formularioCliente.get('cedula')?.value.substring(0, 6) + "@A";
    const objeto = { correo: correo, username: username, pass: pass };
    this._clienteService.enviarCredenciales(objeto).subscribe(
      data => { })
  }
}
