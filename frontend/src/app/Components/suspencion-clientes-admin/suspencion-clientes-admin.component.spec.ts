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
