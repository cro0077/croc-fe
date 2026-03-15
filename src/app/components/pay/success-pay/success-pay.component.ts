import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReportInfoComponent } from '../../report/report-info/report-info.component';
import { ReportDataResponse } from '../../../../services/models';
import { PayService } from '../../../../services/pay.service';
import { isPlatformBrowser } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-success-pay',
  standalone: true,
  imports: [MatProgressSpinnerModule, TranslateModule, MatButtonModule,
    MatIconModule, ReportInfoComponent, ClipboardModule],
  templateUrl: './success-pay.component.html',
  styleUrl: './success-pay.component.scss'
})
export class SuccessPayComponent {

  public loading = true;
  public error = false;
  private sesionId?: string;
  public generatedReport?: ReportDataResponse;
  public generatedKey?: string;
  public numLeftReports?: number;

  constructor(private activatedRoute: ActivatedRoute,
              private payService: PayService,
              private cdRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {
  }

  ngOnInit() {
    if (!!isPlatformBrowser(this.platformId)) {
      const id = this.activatedRoute.snapshot.queryParamMap.get('id');
      if (!!id) {
        this.sesionId = id;
        this.payService.successUpdate({id: this.sesionId}).subscribe({
          next: (res) => {
            this.generatedReport = res.report;
            this.generatedKey = res.key;
            this.numLeftReports = res.numLeftReports;
            this.loading = false;
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
          },
          error: (err: any) => {
            this.error = true;
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            throw err;
          }
        });
      }
    }
  }

}
