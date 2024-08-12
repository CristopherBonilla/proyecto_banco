import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UsuarioService } from 'src/app/services/usuario/usuarios.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
  ) {
    this.resetPasswordForm = this.fb.group({
      
      cedula: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  passwordsMatch(group: FormGroup): any {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método para encriptar la contraseña
  hashPassword(password: string): string {
    let hash = 0;

    if (password.length === 0) {
      return hash.toString();
    }

    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    return hash.toString();
  }
  
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const cedula = this.resetPasswordForm.get('cedula')?.value;
      const nuevaPassword = this.resetPasswordForm.get('newPassword')?.value;

      // Encriptar la nueva contraseña antes de enviarla
      const hashedPassword = this.hashPassword(nuevaPassword);

      this.usuarioService.cambiarPassword(cedula, hashedPassword).subscribe(
        (response: any) => {
          if (response.message === 'Contraseña actualizada correctamente') {
            this.toastr.success('Contraseña actualizada con éxito');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Error al actualizar la contraseña');
          }
        },
        (error: any) => {
          console.error('Error al cambiar la contraseña:', error);
          this.toastr.error('Error al actualizar la contraseña');
        }
      );
    } else {
      this.toastr.error('Por favor, complete el formulario correctamente');
    }
  }

  
  
}
