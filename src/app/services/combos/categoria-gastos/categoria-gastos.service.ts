import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaGastosModel } from '../../../model/categoria-gastos.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaGastosService {

  private apiUrl = `${environment.apiUrl}/filtro/categoria/todas`;

  constructor(
    private http: HttpClient
  ) { }

  categorias(): Observable<CategoriaGastosModel[]> {
    console.log(`Consultando categorias: ${this.apiUrl}`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<CategoriaGastosModel[]>(this.apiUrl);
  }
}
