import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { PayService } from '../../../../services/pay.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-error-pay',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './error-pay.component.html',
  styleUrl: './error-pay.component.scss'
})
export class ErrorPayComponent {
  public loading = true;

  constructor(private activatedRoute: ActivatedRoute,
              private payService: PayService,
              private cdRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
  }

  ngOnInit() {
    if (!!isPlatformBrowser(this.platformId)) {
      const id = this.activatedRoute.snapshot.queryParamMap.get('id');
      if (!!id) {
        this.payService.failureUpdate({id: id}).subscribe({
          next: () => {
            this.loading = false;
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
          },
          error: (error) => {
            this.loading = false;
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            throw error;
          }
        });
      }
    }
  }

}
