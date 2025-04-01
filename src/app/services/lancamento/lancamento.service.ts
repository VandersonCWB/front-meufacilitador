import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LancamentoModel } from '../../model/lancamento.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConsultaLancamentoModel } from '../../model/consulta-lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiUrl = `${environment.apiUrl}/lancamento`;

  constructor(private http: HttpClient) { }

  salvarLancamento(lancamento: LancamentoModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, lancamento, { headers });
  }

  consultarLancamento(): Observable<ConsultaLancamentoModel[]> {
    console.log(`Consultando Lançamentos: ${this.apiUrl}`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ConsultaLancamentoModel[]>(this.apiUrl);
  }

  consultarLancamentoPorId(id: string): Observable<ConsultaLancamentoModel> {
    console.log(`Consultando Lançamentos: ${this.apiUrl}`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ConsultaLancamentoModel>(`${this.apiUrl}/${id}`);
  }
}
