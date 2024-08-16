import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { NuevasCredencialesComponent } from './nuevas-credenciales.component';
<<<<<<< HEAD
import { UsuarioService } from '../../services/usuario.service'; // Importar el servicio UsuarioService
=======
import { UsuarioService } from '../../services/usuario.service'; // Asegúrate de que la ruta sea correcta
>>>>>>> main

describe('NuevasCredencialesComponent', () => {
  let component: NuevasCredencialesComponent;
  let fixture: ComponentFixture<NuevasCredencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevasCredencialesComponent ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule, // Necesario para Toastr
        ToastrModule.forRoot(),  // Configuración global para Toastr
        ReactiveFormsModule      // Importa ReactiveFormsModule para el uso de formGroup
      ],
      providers: [ UsuarioService, ToastrService ] // Proveedor de ToastrService
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevasCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevasCredencialesComponent } from './nuevas-credenciales.component';

describe('NuevasCredencialesComponent', () => {
  let component: NuevasCredencialesComponent;
  let fixture: ComponentFixture<NuevasCredencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevasCredencialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevasCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD
});*/
=======
});*/
>>>>>>> main
