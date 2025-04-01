import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaLancamentoComponent } from './consulta-lancamento.component';

describe('ConsultaLancamentoComponent', () => {
  let component: ConsultaLancamentoComponent;
  let fixture: ComponentFixture<ConsultaLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaLancamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
