import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastComponent } from './componentes/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Meu Facilitador';

  appName = 'Meu Facilitador';
  anoAtual = 2025;
  timeoutId: any;
  
  contas: any[] = [
    { id: 1, nome: 'Conta de Luz', valor: 150.75, vencimento: '2024-03-30' },
    { id: 2, nome: 'Internet', valor: 99.90, vencimento: '2024-04-05' },
    { id: 3, nome: 'Cartão de Crédito', valor: 1200.50, vencimento: '2024-04-10' }
  ];

  constructor(private elementRe: ElementRef) {
    console.log(this.contas); // Apenas para testar se a variável foi inicializada corretamente
  }
}