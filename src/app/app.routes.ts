import { Routes } from '@angular/router';
import { LancamentoComponent } from './componentes/lancamento/lancamento.component';
import { HomeComponent } from './componentes/home/home.component';
import { CarteiraComponent } from './componentes/carteira/carteira.component';

export const routes: Routes = [
    { path: 'carteira', component: CarteiraComponent },
    { path: 'home', component: HomeComponent },
    { path: 'lancamento', component: LancamentoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
  
