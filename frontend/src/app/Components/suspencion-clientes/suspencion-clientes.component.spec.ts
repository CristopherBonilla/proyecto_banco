import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { SuspencionClientesComponent } from './suspencion-clientes.component';

describe('SuspencionClientesComponent', () => {
  let component: SuspencionClientesComponent;
  let fixture: ComponentFixture<SuspencionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Asegúrate de importar ReactiveFormsModule
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ SuspencionClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspencionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspencionClientesComponent } from './suspencion-clientes.component';

describe('SuspencionClientesComponent', () => {
  let component: SuspencionClientesComponent;
  let fixture: ComponentFixture<SuspencionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspencionClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspencionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/