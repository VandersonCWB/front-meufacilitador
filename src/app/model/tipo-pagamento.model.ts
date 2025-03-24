
  export interface TipoPagamento {
    codigo: 'CARTAO_CREDITO' | 'PIX_DEBITO';
    nome: string;
  }
    
  export const TIPOS_PAGAMENTO: TipoPagamento[] = [
    { codigo: 'CARTAO_CREDITO', nome: 'Cartão de Crédito' },
    { codigo: 'PIX_DEBITO', nome: 'Pix/Débito'}
  ];