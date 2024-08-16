import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { HistorialComponent } from './historial.component';
import { TransferenciaService } from '../../services/trasferencia/trasferencia.service';
import { of } from 'rxjs';

// Mock del servicio TransferenciaService
class MockTransferenciaService {
  getTransferencias() {
    return of([{
      id: 123,
      cliente: {
        nombre: 'Juan Pérez',
        cuenta: '1234567890'
      },
      monto: 500,
      fecha: '2024-08-15'
    }]);
  }
}

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialComponent ],
      imports: [ HttpClientModule, ToastrModule.forRoot() ],
      providers: [
        { provide: TransferenciaService, useClass: MockTransferenciaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
/*
    // Asegúrate de que transferenciaObj está definido directamente en el componente
    if (component.transferencias === undefined) {
      component.transferencias = mockTransferenciaService.transferencias;
    }
*/

    // Simula el comportamiento esperado
    component.ngOnInit();
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