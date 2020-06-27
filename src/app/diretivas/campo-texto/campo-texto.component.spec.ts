import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoTextoComponent } from './campo-texto.component';

describe('CampoTextoComponent', () => {
  let component: CampoTextoComponent;
  let fixture: ComponentFixture<CampoTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
