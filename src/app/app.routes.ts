import { Routes } from '@angular/router';
import { LancamentoComponent } from './componentes/lancamento/inclusao-lancamento/lancamento.component';
import { HomeComponent } from './componentes/home/home.component';
import { CarteiraComponent } from './componentes/carteira/carteira.component';
import { ConsultaLancamentoComponent } from './componentes/lancamento/consulta-lancamento/consulta-lancamento.component';

export const routes: Routes = [
    { path: 'carteira', component: CarteiraComponent },
    { path: 'home', component: HomeComponent },
    { path: 'lancamento', component: LancamentoComponent },
    { path: 'consulta-lancamento', component: ConsultaLancamentoComponent },
    { path: 'alterar-lancamento/:id', component: LancamentoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
  
