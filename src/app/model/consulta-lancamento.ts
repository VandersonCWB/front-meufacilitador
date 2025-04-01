export interface ConsultaLancamentoModel {
    id: number;
    dataCompra: Date;
    dataReferencia: Date;
    idTipoPagamento: number;
    nomeTipoPagamento: String;
    idCategoriaLancamento: number;
    nomeCategoriaLancamento: String;
    valorCompra: number;
    qtdParcelas: number;
    observacoes: String;
    dataHoraInclusao: Date;
    cpfUsuario: number;
}