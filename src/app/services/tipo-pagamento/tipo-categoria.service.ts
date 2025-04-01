import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoPagamentoModel } from '../../model/tipo-pagamento.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPagamentoService {

  private apiUrl = `${environment.apiUrl}/filtro/tipoPagamento/todas`;

  constructor(
    private http: HttpClient
  ) { }

  tiposPagamento(): Observable<TipoPagamentoModel[]> {
    console.log(`Consultando tipos pagamento: ${this.apiUrl}`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<TipoPagamentoModel[]>(this.apiUrl);
  }
}
