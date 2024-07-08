import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';//agregado para formularios
import { HttpClientModule } from '@angular/common/http';//para conexion

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MenuPrincipalComponent } from './component/menu-principal/menu-principal.component';
import { NuevasCredencialesComponent } from './component/nuevas-credenciales/nuevas-credenciales.component';
import { PreguntaSeguridadComponent } from './component/pregunta-seguridad/pregunta-seguridad.component';
import { RegistroClienteComponent } from './component/registro-cliente/registro-cliente.component';
import { TransferenciasInternasResumenComponent } from './component/transferencias-internas-resumen/transferencias-internas-resumen.component';
import { TransferenciasInternasComponent } from './component/transferencias-internas/transferencias-internas.component';
import { TransferenciasComponent } from './component/transferencias/transferencias.component';
import { MenuAdminComponent } from './component/menu-admin/menu-admin.component';
import { RegistroCuentaComponent } from './component/registro-cuenta/registro-cuenta.component';
import { SuspencionClienteComponent } from './component/suspencion-cliente/suspencion-cliente.component'; 



const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuPrincipalComponent},
    { path: 'usuario', component: NuevasCredencialesComponent},
    { path: 'pregunta', component: PreguntaSeguridadComponent},
    { path: 'menu-admin', component: MenuAdminComponent},
    { path: 'registro-cliente', component: RegistroClienteComponent},
    { path: 'registro-cuenta', component: RegistroCuentaComponent},
    { path: 'suspender-cliente', component: SuspencionClienteComponent},
    { path: 'transferencia', component: TransferenciasComponent},
    { path: 'transferencia-interna', component: TransferenciasInternasComponent},
    { path: 'transferencia-interna-resumen', component: TransferenciasInternasResumenComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],//para conexion
  exports: [RouterModule,ReactiveFormsModule]//agregado para formularios
})
export class AppRoutingModule { }
