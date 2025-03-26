import { Component } from '@angular/core';
import { LancamentoService } from '../../services/lancamento/lancamento.service';
import { TIPOS_PAGAMENTO } from '../../model/tipo-pagamento.model';
import { TIPOS_LANCAMENTO } from '../../model/tipo-lancamento.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-lancamento',
  imports: [
    FormsModule, 
    NgxCurrencyDirective,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ DatePipe ],
  templateUrl: './lancamento.component.html',
  styleUrl: './lancamento.component.css'
})
export class LancamentoComponent {
  lancamentoForm: FormGroup;

  showToast = false;
  validationMessage: string = '';

  tiposLancamento = TIPOS_LANCAMENTO;
  tiposPagamento = TIPOS_PAGAMENTO;

  currentId: number = 0;

  currencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    precision: 2
  };
  
  constructor(
    private fb: FormBuilder, 
    private datePipe: DatePipe, 
    private lancamentoService: LancamentoService,
    private toastService: ToastService) {

    this.lancamentoForm = this.fb.group({
      dataCompra: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      dataReferencia: [null, Validators.required],
      tipoPagamento: ['CARTAO_CREDITO', Validators.required],
      tipoCompra: ['', Validators.required],
      valorCompra: [null, Validators.required],
      qtdParcelas: [1, [Validators.required, Validators.min(1), Validators.max(360)]],
      observacoes: ['']
    });

    this.calcularParcela();

    this.lancamentoForm.get('valorCompra')!.valueChanges.subscribe(() => this.calcularParcela());
    this.lancamentoForm.get('qtdParcelas')!.valueChanges.subscribe(() => this.calcularParcela());
  }

  valorParcela: number = 0;

  calcularParcela(): void {
    const valorCompra = this.lancamentoForm.get('valorCompra')!.value;
    const qtdParcelas = this.lancamentoForm.get('qtdParcelas')!.value;

    if (valorCompra && qtdParcelas) {
      this.valorParcela = valorCompra / qtdParcelas;
    } else {
      this.valorParcela = 0;
    }
  }

  salvarLancamento() {
    if (this.lancamentoForm.valid) {
      console.log(this.lancamentoForm.value);
      
      this.lancamentoService.salvarLancamento(this.lancamentoForm.value).subscribe(
        (resposta) => {
          this.toastService.showMessageSucess('Lançamento salvo com sucesso!');
          this.lancamentoForm.reset();
        },
        (erro) => {
          this.toastService.showMessageError('Erro ao salvar lançamento');
        }
      );
    } else {
      this.toastService.showMessageError('Dados obrigatórios não foram preenchidos.');
    }
  }
}
