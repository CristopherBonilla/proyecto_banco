import { RouterTestingModule } from '@angular/router/testing';
import { PreguntaSeguridadComponent } from './pregunta-seguridad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario/usuarios.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PreguntaSeguridadComponent', () => {
  let component: PreguntaSeguridadComponent;
  let fixture: ComponentFixture<PreguntaSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()  // Importa el ToastrModule con una configuración básica
      ],
      declarations: [PreguntaSeguridadComponent],
      providers: [
        UsuarioService,
        ClienteService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaSeguridadComponent } from './pregunta-seguridad.component';

describe('PreguntaSeguridadComponent', () => {
  let component: PreguntaSeguridadComponent;
  let fixture: ComponentFixture<PreguntaSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaSeguridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntaSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/