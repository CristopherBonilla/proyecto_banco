import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Importa el ToastrModule y ToastrService

import { RecuperarConComponent } from './recuperar-con.component';

describe('RecuperarConComponent', () => {
  let component: RecuperarConComponent;
  let fixture: ComponentFixture<RecuperarConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarConComponent ],
      imports: [ ToastrModule.forRoot() ], // Agrega ToastrModule en los imports
      providers: [ ToastrService ] // Asegúrate de que ToastrService esté en los providers
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarConComponent } from './recuperar-con.component';

describe('RecuperarConComponent', () => {
  let component: RecuperarConComponent;
  let fixture: ComponentFixture<RecuperarConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarConComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
