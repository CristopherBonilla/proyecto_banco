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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) {
    this.recuperarConForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required]] // Agregado para cédula
    });

    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { }

  sendVerificationCode(): void {
    if (this.recuperarConForm.invalid) {
      this.toastr.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const email = this.recuperarConForm.get('email')?.value;
    const cedula = this.recuperarConForm.get('cedula')?.value;

    this.clienteService.validarCorreoLogin({ correo: email }).subscribe(
      (data) => {
        this.verificationCode = data.toString();
        this.isCodeSent = true;
        this.toastr.success('Código de verificación enviado al correo electrónico.');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al enviar el código de verificación.');
      }
    );
  }

  verifyCode(): void {
    const code = this.verificationForm.get('code')?.value;
    if (code === this.verificationCode) {
      this.toastr.success('Código verificado correctamente. Ahora puedes restablecer tu contraseña.');
      localStorage.setItem('resetEmail', this.recuperarConForm.get('email')?.value); // Guarda el email en localStorage
      this.router.navigate(['/reset-password']); // Redirige al formulario de restablecimiento de contraseña
    } else {
      this.toastr.error('El código de verificación es incorrecto. Inténtalo de nuevo.');
    }
  }

  resendCode(): void {
    const email = this.recuperarConForm.get('email')?.value;
    const cedula = this.recuperarConForm.get('cedula')?.value;

    if (this.recuperarConForm.invalid) {
      this.toastr.error('Por favor, ingrese un correo electrónico y una cédula válidos.');
      return;
    }

    this.clienteService.validarCorreoLogin({ correo: email }).subscribe(
      (data) => {
        this.verificationCode = data.toString();
        this.toastr.success('Código de verificación reenviado al correo electrónico.');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al reenviar el código de verificación.');
      }
    );
  }
  cancelar(): void {
    this.router.navigate(['/login']);
  }
}
