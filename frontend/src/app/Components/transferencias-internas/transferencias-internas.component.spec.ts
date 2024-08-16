import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TransferenciasInternasComponent } from './transferencias-internas.component';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

describe('TransferenciasInternasComponent', () => {
  let component: TransferenciasInternasComponent;
  let fixture: ComponentFixture<TransferenciasInternasComponent>;

  // Mock del servicio ClienteService
  const mockClienteService = {
    obtenerCliente: jasmine.createSpy('obtenerCliente').and.callFake(() => ({
      subscribe: (callback: any) => callback({ nombres: 'Juan', apellidos: 'Pérez' })
    }))
  };

  beforeEach(async () => {
    // Crear un mock para el objeto window.history
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          transferenciaObj: {
            cedula: '1234567890'
          }
        }
      },
      writable: true
    });

    await TestBed.configureTestingModule({
      declarations: [ TransferenciasInternasComponent ],
      imports: [
        HttpClientModule, // Importar HttpClientModule
        ToastrModule.forRoot() // Importar y configurar ToastrModule
      ],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: Router, useValue: {} } // Mock del Router si es necesario
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasInternasComponent } from './transferencias-internas.component';

describe('TransferenciasInternasComponent', () => {
  let component: TransferenciasInternasComponent;
  let fixture: ComponentFixture<TransferenciasInternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciasInternasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/