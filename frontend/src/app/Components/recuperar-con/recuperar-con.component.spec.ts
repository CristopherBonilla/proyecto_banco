import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
