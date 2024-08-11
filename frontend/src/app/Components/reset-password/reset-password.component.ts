import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) {
    this.resetPasswordForm = this.fb.group({
      cedula: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {}

  passwordsMatch(group: FormGroup): any {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos correctamente.');
      return;
    }

    const cedula = this.resetPasswordForm.get('cedula')?.value;
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;

    // Llamar al servicio para actualizar la contraseña en la base de datos
    this.clienteService.actualizarContrasena({ cedula, nuevaPassword: newPassword }).subscribe(
      (data) => {
        this.toastr.success('Contraseña restablecida con éxito.');
        this.router.navigate(['/login']); // Redirigir al usuario al login
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al restablecer la contraseña.');
      }
    );
  }
}
