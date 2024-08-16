import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule

import { HistorialComponent } from './historial.component';
import { CuentaService } from '../../services/cuenta/cuenta.service'; // Importa el servicio si es necesario
import { TransferenciaService } from '../../services/trasferencia/trasferencia.service'; // Importa el servicio si transferenciaObj viene de aquí

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  // Mock del servicio si transferenciaObj proviene de TransferenciaService
  const mockTransferenciaService = {
    transferencias: { id: 123,
      cliente: {
        nombre: 'Juan Pérez',
        cuenta: '1234567890'
      },
      monto: 500,
      fecha: '2024-08-15'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialComponent ],
      imports: [ HttpClientModule, ToastrModule.forRoot() ],
      providers: [
        CuentaService,
        { provide: TransferenciaService, useValue: mockTransferenciaService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
/*
    // Asegúrate de que transferenciaObj está definido directamente en el componente
    if (component.transferencias === undefined) {
      component.transferencias = mockTransferenciaService.transferencias;
    }
*/
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialComponent } from './historial.component';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/