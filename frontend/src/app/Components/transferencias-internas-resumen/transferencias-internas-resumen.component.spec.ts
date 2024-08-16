import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Usa HttpClientTestingModule para pruebas HTTP
import { RouterTestingModule } from '@angular/router/testing'; // Usa RouterTestingModule para pruebas de enrutamiento
import { TransferenciasInternasResumenComponent } from './transferencias-internas-resumen.component';

describe('TransferenciasInternasResumenComponent', () => {
  let component: TransferenciasInternasResumenComponent;
  let fixture: ComponentFixture<TransferenciasInternasResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasInternasResumenComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ] // Agrega los módulos necesarios
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInternasResumenComponent);
    component = fixture.componentInstance;

    // Crea un mock de history.state
    Object.defineProperty(window, 'history', {
      writable: true,
      value: {
        state: {
          transferenciaObj: {
            cliente: {
              nombre: 'Juan Pérez',
              cuenta: '1234567890'
            },
            monto: 500,
            fecha: '2024-08-15'
          }
        }
      }
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/*
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasInternasResumenComponent } from './transferencias-internas-resumen.component';

describe('TransferenciasInternasResumenComponent', () => {
  let component: TransferenciasInternasResumenComponent;
  let fixture: ComponentFixture<TransferenciasInternasResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasInternasResumenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInternasResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/