import { Component } from '@angular/core';
import { LancamentoModel } from '../../../model/lancamento.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LancamentoService } from '../../../services/lancamento/lancamento.service';
import { ConsultaLancamentoModel } from '../../../model/consulta-lancamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-lancamento',
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-lancamento.component.html',
  styleUrl: './consulta-lancamento.component.css'
})
export class ConsultaLancamentoComponent {

  lancamentos: ConsultaLancamentoModel[] = [];
  lancamentosFiltrados: ConsultaLancamentoModel[] = [];
  paginaAtual = 1;
  itensPorPagina = 10;
  totalPaginas = 0;
  filtrosForm: FormGroup;
  tiposPagamento = ['Crédito', 'Débito', 'Dinheiro', 'Pix'];
  categorias = ['Alimentação', 'Transporte', 'Lazer', 'Outros'];

  constructor(
    private lancamentoService: LancamentoService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.filtrosForm = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
      tipoPagamento: [null],
      categoria: [null]
    });
  }

  ngOnInit(): void {
    this.consultarLancamentos();
    this.filtrarLancamentos();
  }

  consultarLancamentos() {
    this.lancamentoService.consultarLancamento().subscribe({
      next: (data) => {
        console.log(data);
        this.lancamentos = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filtrarLancamentos(): void {
    
    const filtros = this.filtrosForm.value;
    this.lancamentosFiltrados = this.lancamentos;/*.filter(lancamento => {
      const dataValida = (!filtros.dataInicio || lancamento.dataCompra >= filtros.dataInicio) &&
        (!filtros.dataFim || lancamento.dataCompra <= filtros.dataFim);
      const tipoValido = !filtros.tipoPagamento || lancamento.tipoPagamento === filtros.tipoPagamento;
      const categoriaValida = !filtros.categoria || lancamento.tipoCompra === filtros.categoria;
      return dataValida && tipoValido && categoriaValida;
    });*/
    this.paginaAtual = 1;
    this.calcularPaginas();
    /**/
  }

  calcularPaginas(): void {
    this.totalPaginas = Math.ceil(this.lancamentosFiltrados.length / this.itensPorPagina);
  }

  get lancamentosPaginados(): ConsultaLancamentoModel[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.lancamentosFiltrados.slice(inicio, fim);
  }

  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  excluirLancamento(arg0: number) {
    throw new Error('Method not implemented.');
  }
  
  alterarLancamento(lancamento: ConsultaLancamentoModel) {
    this.router.navigate(['/alterar-lancamento', lancamento.id]);
  }
}
