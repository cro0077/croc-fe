import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppInterceptor } from './utils/app-interceptor';
import { GlobalErrorHandler } from './utils/global-error-handler.service';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { MissingTranslationHandler, provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MissingTranslationHelper } from './utils/MissingTranslationHelper';


// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + environment.version);
// }


const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, inMemoryScrollingFeature), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },

    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix:'./assets/i18n/',
        suffix:'.json',
        enforceLoading: true,    // Adds cache-busting timestamp
        useHttpBackend: true     // Bypasses HTTP interceptors
      }),
      missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MissingTranslationHelper
        }
    }),
    // importProvidersFrom(
    //   TranslateModule.forRoot({
    //     loader: {
    //       provide: TranslateLoader,
    //       useFactory: HttpLoaderFactory,
    //       deps: [HttpClient]
    //     },
    //     missingTranslationHandler: {
    //       provide: MissingTranslationHandler,
    //       useClass: MissingTranslationHelper
    //     }
    //   })
    // ),

    provideClientHydration(withEventReplay()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler},
  ]
};
