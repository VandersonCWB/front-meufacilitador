import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LancamentoModel } from '../../model/lancamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiUrl = 'http://localhost:8080/lancamento';

  constructor(private http: HttpClient) { }

  salvarLancamento(lancamento: LancamentoModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, lancamento, { headers });
  }
}
