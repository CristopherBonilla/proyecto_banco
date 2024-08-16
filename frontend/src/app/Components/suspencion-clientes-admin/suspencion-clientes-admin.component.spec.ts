import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas HTTP
import { ToastrModule } from 'ngx-toastr'; // Importa el módulo de Toastr
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { SuspencionClientesAdminComponent } from './suspencion-clientes-admin.component';

describe('SuspencionClientesAdminComponent', () => {
  let component: SuspencionClientesAdminComponent;
  let fixture: ComponentFixture<SuspencionClientesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(), // Añade el módulo de Toastr aquí
        ReactiveFormsModule // Añade ReactiveFormsModule aquí
      ],
      declarations: [SuspencionClientesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspencionClientesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



/*
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspencionClientesAdminComponent } from './suspencion-clientes-admin.component';

describe('SuspencionClientesAdminComponent', () => {
  let component: SuspencionClientesAdminComponent;
  let fixture: ComponentFixture<SuspencionClientesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspencionClientesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspencionClientesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/