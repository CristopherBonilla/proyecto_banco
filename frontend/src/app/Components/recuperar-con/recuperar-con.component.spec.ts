import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

import { RecuperarConComponent } from './recuperar-con.component';

describe('RecuperarConComponent', () => {
  let component: RecuperarConComponent;
  let fixture: ComponentFixture<RecuperarConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarConComponent ],
      imports: [
        HttpClientTestingModule, // Agrega HttpClientTestingModule
        ReactiveFormsModule, // Agrega ReactiveFormsModule
        ToastrModule.forRoot() // Agrega ToastrModule
      ],
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
