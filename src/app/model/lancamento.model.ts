export interface LancamentoModel {
    id: number | null;
    dataCompra: Date;
    dataReferencia: Date;
    tipoPagamento: string;
    tipoCompra: string;
    valorCompra: number;
    qtdParcelas: number;
    observacoes: string;
}