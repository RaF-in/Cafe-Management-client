import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './AuthInterceptor.service';


export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withInterceptors([authInterceptor])),
  provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),// provideRouter(routes,withPreloading(PreloadAllModules)) for preloading lazy loaded components
  ]
};
