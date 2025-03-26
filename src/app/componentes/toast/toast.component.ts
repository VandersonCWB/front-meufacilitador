import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '../../services/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [ CommonModule ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit() {}

  closeToast(toast: { id: string, message: string, type: ToastType }): void {
    this.toastService.removeToast(toast);
  }
}