import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MenuPrincipalComponent } from './menu-principal.component';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { HistoryService } from 'src/app/services/history.service';

class MockClienteService {
  obtenerCliente(cedula: object) {
    return of({ nombres: 'Juan', apellidos: 'Pérez' });
  }
}

class MockCuentaService {
  getCuentaByCI(cuenta: object) {
    return of([{ tipo_cuenta: '10' }, { tipo_cuenta: '20' }]);
  }
}

class MockHistoryService {
  getState() {
    return { cedula: { cedula: '1234567890' } };
  }
}

describe('MenuPrincipalComponent', () => {
  let component: MenuPrincipalComponent;
  let fixture: ComponentFixture<MenuPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MenuPrincipalComponent],
      providers: [
        
        { provide: ClienteService, useClass: MockClienteService },
        { provide: CuentaService, useClass: MockCuentaService },
        { provide: HistoryService, useClass: MockHistoryService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle client and account data', () => {
    component.ngOnInit();
    expect(component.listCuentas.length).toBe(2);
    expect(component.listCuentas[0].tipo_cuenta).toBe('Cuenta de Ahorros');
    expect(component.listCuentas[1].tipo_cuenta).toBe('Cuenta Corriente');
  });
});



/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPrincipalComponent } from './menu-principal.component';

describe('MenuPrincipalComponent', () => {
  let component: MenuPrincipalComponent;
  let fixture: ComponentFixture<MenuPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/