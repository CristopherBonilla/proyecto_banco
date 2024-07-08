import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspencionClienteComponent } from './suspencion-cliente.component';

describe('SuspencionClienteComponent', () => {
  let component: SuspencionClienteComponent;
  let fixture: ComponentFixture<SuspencionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspencionClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspencionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
