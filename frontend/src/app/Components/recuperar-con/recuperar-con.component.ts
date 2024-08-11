import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-recuperar-con',
  templateUrl: './recuperar-con.component.html',
  styleUrls: ['./recuperar-con.component.css']
})
export class RecuperarConComponent implements OnInit {
  public recuperarConForm!: FormGroup;
  public verificationForm!: FormGroup;
  public isCodeSent: boolean = false;
  public verificationCode: string = '';
  public isCodeVerified: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) {
    this.recuperarConForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]] // Asegúrate de ajustar el patrón si es necesario
    });

    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  sendVerificationCode(): void {
    if (this.recuperarConForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos correctamente.');
      return;
    }

    const email = this.recuperarConForm.get('email')?.value;
    const cedula = this.recuperarConForm.get('cedula')?.value;

    this.clienteService.validarCorreoLogin({ correo: email }).subscribe(
      (data: any) => {
        this.verificationCode = data.toString();
        this.isCodeSent = true;
        this.toastr.success('Código de verificación enviado al correo electrónico.');
      },
      (error) => {
        console.log('Error al enviar el código de verificación:', error);
        this.toastr.error('Error al enviar el código de verificación.');
      }
    );
  }

  verifyCode(): void {
    const code = this.verificationForm.get('code')?.value;
    if (code === this.verificationCode) {
      this.toastr.success('Código verificado correctamente.');
      this.isCodeVerified = true;
    } else {
      this.toastr.error('El código de verificación es incorrecto. Inténtalo de nuevo.');
    }
  }

  enviarCredenciales(): void {
    if (!this.isCodeVerified) {
      this.toastr.error('Verifica el código primero.');
      return;
    }

    const email = this.recuperarConForm.get('email')?.value;
    const cedula = this.recuperarConForm.get('cedula')?.value;

    if (email && cedula) {
      const newCredentials = {
        correo: email,
        cedula: cedula,
        estado: true
      };

      // Primero, actualiza el estado del usuario
      this.clienteService.actualizar(newCredentials).subscribe(
        () => {
          // Luego, envía las credenciales
          this.clienteService.reenviarCredenciales({ correo: email }).subscribe(
            (response: any) => {
              console.log('Respuesta del servidor al enviar credenciales:', response);
              this.toastr.success('Las credenciales han sido enviadas al correo electrónico.');
              this.router.navigate(['/login']); // Redirige al login o a la página deseada
            },
            (error) => {
              console.log('Error al enviar las credenciales:', error);
              this.toastr.error('Error al enviar las credenciales.');
            }
          );
        },
        (error) => {
          console.log('Error al actualizar el estado del usuario:', error);
          this.toastr.error('Error al actualizar el estado del usuario.');
        }
      );
    } else {
      this.toastr.error('Faltan datos para enviar las credenciales.');
    }
  }
}
