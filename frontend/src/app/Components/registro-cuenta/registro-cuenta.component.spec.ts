import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr'; // Importa el módulo de toastr
import { RegistroCuentaComponent } from './registro-cuenta.component';

describe('RegistroCuentaComponent', () => {
  let component: RegistroCuentaComponent;
  let fixture: ComponentFixture<RegistroCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot() // Configura el módulo de toastr para pruebas
      ],
      declarations: [ RegistroCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuentaComponent } from './registro-cuenta.component';

describe('RegistroCuentaComponent', () => {
  let component: RegistroCuentaComponent;
  let fixture: ComponentFixture<RegistroCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/