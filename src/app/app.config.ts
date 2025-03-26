import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideEnvironmentNgxCurrency({
      align: 'left',
      allowNegative: true,
      allowZero: true,
      decimal: ',',
      precision: 2,
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      nullable: true,
      min: -999999999999999,
      max: 999999999999999,
      inputMode: NgxCurrencyInputMode.Financial
    }),
    provideHttpClient(),
    importProvidersFrom(FormsModule),
    provideRouter(routes)
  ]
};
