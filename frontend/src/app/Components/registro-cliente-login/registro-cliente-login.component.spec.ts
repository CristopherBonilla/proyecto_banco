import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroClienteLoginComponent } from './registro-cliente-login.component';

describe('RegistroClienteLoginComponent', () => {
  let component: RegistroClienteLoginComponent;
  let fixture: ComponentFixture<RegistroClienteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroClienteLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroClienteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
