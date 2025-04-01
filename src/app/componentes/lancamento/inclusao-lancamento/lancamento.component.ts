import { Component, Input, OnInit } from '@angular/core';
import { LancamentoService } from '../../../services/lancamento/lancamento.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../../services/toast/toast.service';
import { CategoriaGastosService } from '../../../services/combos/categoria-gastos/categoria-gastos.service';
import { CategoriaGastosModel } from '../../../model/categoria-gastos.model';
import { TipoPagamentoModel } from '../../../model/tipo-pagamento.model';
import { TipoPagamentoService } from '../../../services/tipo-pagamento/tipo-categoria.service';
import { ConsultaLancamentoModel } from '../../../model/consulta-lancamento';
import { ActivatedRoute, Router } from '@angular/router';

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
export class LancamentoComponent implements OnInit{

  lancamentoForm: FormGroup;

  showToast = false;
  validationMessage: string = '';

  tiposLancamento: CategoriaGastosModel[] = [];
  tiposPagamento: TipoPagamentoModel[] = [];

  currentId: number = 0;

  currencyOptions = {
    prefix: '',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    precision: 2
  };
  
  constructor(
    private fb: FormBuilder, 
    private datePipe: DatePipe, 
    private lancamentoService: LancamentoService,
    private toastService: ToastService,
    private categoriaGastosService: CategoriaGastosService,
    private tipoPagamentoService: TipoPagamentoService,
    private route: ActivatedRoute
  ) {

    this.lancamentoForm = this.fb.group({
      dataCompra: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      dataReferencia: [null, Validators.required],
      tipoPagamento: [1, Validators.required],
      categoriaLancamento: [null, Validators.required],
      valorCompra: [null, Validators.required],
      qtdParcelas: [1, [Validators.required, Validators.min(1), Validators.max(360)]],
      observacoes: [''],
      cpfUsuario: 5270482916
    });

    this.carregarCategorias();
    this.carregarTiposPagamento();
    this.calcularParcela();

    this.lancamentoForm.get('valorCompra')!.valueChanges.subscribe(() => this.calcularParcela());
    this.lancamentoForm.get('qtdParcelas')!.valueChanges.subscribe(() => this.calcularParcela());
  }

  ngOnInit(): void {
    const idLancamento: string | null = this.route.snapshot.paramMap.get('id');
    
    if (idLancamento) {
      this.consultarLancamentoPorId(idLancamento);
    }
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

  carregarCategorias() {
    this.categoriaGastosService.categorias().subscribe({
      next: (data) => {
        this.tiposLancamento = data;
      },
      error: (error) => {
        this.toastService.showMessageError('Erro ao carregar categorias.');
      }
    });
  }

  carregarTiposPagamento() {
    this.tipoPagamentoService.tiposPagamento().subscribe({
      next: (data) => {
        this.tiposPagamento = data;
      },
      error: (error) => {
        console.log(error);
        this.toastService.showMessageError('Erro ao carregar tipos de pagamento.');
      }
    });
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

  consultarLancamentoPorId(id: string) {
    this.lancamentoService.consultarLancamentoPorId(id).subscribe({
      next: (data) => {
        this.lancamentoForm.patchValue({
          dataCompra: data.dataCompra,
          dataReferencia: data.dataReferencia,
          tipoPagamento: data.idTipoPagamento,
          categoriaLancamento: data.idCategoriaLancamento,
          valorCompra: data.valorCompra,
          qtdParcelas: data.qtdParcelas,
          observacoes: data.observacoes,
          cpfUsuario: 5270482916
        });
        console.log('Consulta para edição.');
        console.log(data);
      },
      error: (error) => {
        this.toastService.showMessageError('Não foi possível consultar registro para edição.');
      }
    });
  }
}
