import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import {BehaviorSubject, lastValueFrom} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TranslationService {
  defaultLang = 'en';
  private readonly languageChangedSubject = new BehaviorSubject<string>(this.defaultLang);
  public languageChanged$ = this.languageChangedSubject.asObservable();

    constructor(
        private readonly translateService: TranslateService,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
    ) {
        this.translateService.addLangs(['en','bg']);

        if (isPlatformBrowser(this.platformId)) {

            const savedLang = localStorage.getItem('lng');
            if (savedLang) {
                this.defaultLang = savedLang;
            }
            this.translateService.setFallbackLang(this.defaultLang);
            this.translateService.use(this.defaultLang);
        }
    }

    public changeLang(lang: string) {
        this.translateService.use(lang);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('lng', lang);
        }
      this.languageChangedSubject.next(lang);
    }


    public getLanguage(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const storageItem = localStorage?.getItem('lng');
            return storageItem ? storageItem as string : null;
        }
        return this.defaultLang;
    }

    public get currentLang() {
        return this.translateService.getCurrentLang();
    }

    public getLangs() {
        return this.translateService.getLangs();
    }
}
// export function ApplicationInitializerFactory (
//     translate: TranslateService) { //, injector: Injector
//     return async () => {
//     //   await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

//       const deaultLang = 'en';
//       translate.addLangs(['en', 'bg']);
//       translate.setFallbackLang(deaultLang);
//       try {
//         await lastValueFrom(translate.use(deaultLang));
//       } catch (err) {
//         console.log(err);
//       }
//     //   console.log(`Successfully initialized ${deaultLang} language.`);

//     };
// }
