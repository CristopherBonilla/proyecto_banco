import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroClienteComponent } from './Components/registro-cliente/registro-cliente.component';
import { MenuPrincipalComponent } from './Components/menu-principal/menu-principal.component';
import { TransferenciasComponent } from './Components/transferencias/transferencias.component';
import { TransferenciasInternasComponent } from './Components/transferencias-internas/transferencias-internas.component';
import { TransferenciasInternasResumenComponent } from './Components/transferencias-internas-resumen/transferencias-internas-resumen.component';
import { NuevasCredencialesComponent } from './Components/nuevas-credenciales/nuevas-credenciales.component';
import { PreguntaSeguridadComponent } from './Components/pregunta-seguridad/pregunta-seguridad.component';
import { RegistroClienteLoginComponent } from './Components/registro-cliente-login/registro-cliente-login.component';
import { MenuAdminComponent } from './Components/menu-admin/menu-admin.component';
import { RegistroCuentaComponent } from './Components/registro-cuenta/registro-cuenta.component';
import { SuspencionClientesComponent } from './Components/suspencion-clientes/suspencion-clientes.component';
import { SuspencionClientesAdminComponent } from './Components/suspencion-clientes-admin/suspencion-clientes-admin.component';
import { RecuperarConComponent } from './Components/recuperar-con/recuperar-con.component';
import { HistorialComponent } from './Components/historial/historial.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';  // Asegúrate de importar el componente

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroClienteComponent,
    MenuPrincipalComponent,
    TransferenciasComponent,
    TransferenciasInternasComponent,
    TransferenciasInternasResumenComponent,
    NuevasCredencialesComponent,
    PreguntaSeguridadComponent,
    MenuAdminComponent,
    RegistroCuentaComponent,
    SuspencionClientesComponent,
    RecuperarConComponent,
    RegistroClienteLoginComponent,
    ResetPasswordComponent,  // Asegúrate de declarar el componente
    SuspencionClientesAdminComponent,
    HistorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,  // Agrega CommonModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
