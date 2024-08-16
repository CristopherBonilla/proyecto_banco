import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas HTTP
import { ToastrModule } from 'ngx-toastr'; // Importa el módulo de Toastr
import { ReactiveFormsModule } from '@angular/forms'; // Importa el módulo de formularios reactivos
import { RegistroClienteLoginComponent } from './registro-cliente-login.component';

describe('RegistroClienteLoginComponent', () => {
  let component: RegistroClienteLoginComponent;
  let fixture: ComponentFixture<RegistroClienteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Añade el módulo de pruebas HTTP aquí
        ToastrModule.forRoot(),   // Añade el módulo de Toastr aquí
        ReactiveFormsModule       // Añade el módulo de formularios reactivos aquí
      ],
      declarations: [ RegistroClienteLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroClienteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroClienteLoginComponent } from './registro-cliente-login.component';

describe('RegistroClienteLoginComponent', () => {
  let component: RegistroClienteLoginComponent;
  let fixture: ComponentFixture<RegistroClienteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroClienteLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroClienteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/