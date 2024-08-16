import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TransferenciasComponent } from './transferencias.component';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

describe('TransferenciasComponent', () => {
  let component: TransferenciasComponent;
  let fixture: ComponentFixture<TransferenciasComponent>;

  // Mock del servicio ClienteService
  const mockClienteService = {
    obtenerCliente: jasmine.createSpy('obtenerCliente').and.callFake(() => ({
      subscribe: (callback: any) => callback({ nombres: 'Juan', apellidos: 'Pérez' })
    }))
  };

  // Mock de history.state
  const mockHistoryState = {
    transferenciaObj: {
      cedula: '1234567890',
      cuentas: ['Cuenta1', 'Cuenta2']
    }
  };

  beforeEach(async () => {
    // Crear un mock para el objeto window.history
    Object.defineProperty(window, 'history', {
      value: {
        state: mockHistoryState
      },
      writable: true
    });

    await TestBed.configureTestingModule({
      declarations: [TransferenciasComponent],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: Router, useValue: {} } // Mock del Router si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasComponent } from './transferencias.component';

describe('TransferenciasComponent', () => {
  let component: TransferenciasComponent;
  let fixture: ComponentFixture<TransferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/