import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPrincipalComponent } from './menu-principal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteService } from 'src/app/services/cliente/cliente.service'; // Importamos el servicio ClienteService

describe('MenuPrincipalComponent', () => {
  let component: MenuPrincipalComponent;
  let fixture: ComponentFixture<MenuPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPrincipalComponent ],
      imports: [ HttpClientTestingModule ], // Importamos HttpClientTestingModule
      providers: [ ClienteService ] // Proveedor del ClienteService
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
});*/
