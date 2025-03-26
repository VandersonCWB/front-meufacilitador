import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<{id: string; message: string, type: ToastType }[]>([]);
  toast$ = this.toastSubject.asObservable();

  currentId: number = 0;

  private showToast(message: string, type: ToastType = 'info'): void {

    const currentToasts = this.toastSubject.value || [];
    const newToast = { id: (this.currentId++) +'', message, type };
    this.toastSubject.next([...currentToasts.filter(t =>!(t.message === t.message && t.type === t.type )), newToast]);

    setTimeout(() => {
      this.removeToast(newToast);
    }, 10000);
  }

  removeToast(toast: { id: string, message: string, type: ToastType }) {
    const currentToasts = this.toastSubject.value;
    this.toastSubject.next(currentToasts.filter(t => t !== toast));
  }

  showMessageError(message: string): void {
    this.showToast(message, 'error');
  }

  showMessageSucess(message: string): void {
    this.showToast(message, 'success');
  }

  showMessageInfo(message: string): void {
    this.showToast(message, 'info');
  }

  showMessageWarning(message: string): void {
    this.showToast(message, 'warning');
  }
}