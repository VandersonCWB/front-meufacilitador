export interface LancamentoModel {
    dataCompra: Date | null;
    dataReferencia: Date | null;
    tipoPagamento: string | null;
    tipoCompra: string | null;
    valorCompra: number | null;
    qtdParcelas: number | null;
    observacoes: string | null;
}