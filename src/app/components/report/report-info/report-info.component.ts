import { MatCardModule } from '@angular/material/card';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { ChangeDetectorRef, Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportDataResponse, ReportTypes } from '../../../../services/models';
import { ReportService } from '../../../../services/report/report.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-report-info',
  standalone: true,
  imports: [MatProgressSpinnerModule, TranslateModule, MatButtonModule, MatIconModule, MatCardModule, ClipboardModule],
  templateUrl: './report-info.component.html',
  styleUrl: './report-info.component.scss'
})
export class ReportInfoComponent {

  _generatedReport?: ReportDataResponse;

  public getLoading = true;
  public noData = false;
  public originUrl: string;

  public reporFile?: SafeResourceUrl;

  constructor(private reportService: ReportService,
              private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private clipboard: Clipboard,
              private cdRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private readonly platformId: Object) {
    this.originUrl = window.location.origin;
  }

  ngOnInit() {
    if (!!isPlatformBrowser(this.platformId)) {

      const path = this.activatedRoute.snapshot.paramMap.get('path');
      if (!!this._generatedReport) {
        this.loadReport();
      } else if (!!path) {
        this.reportService.get(path).subscribe({
          next: (res: ReportDataResponse) => {
            this._generatedReport = res;
            this.loadReport();
          },
          error: (err: any) => {
            this.noData = true;
            this.getLoading = false;
            this.cdRef.markForCheck();
          }
        })
      } else {
        this.getLoading = false;
        this.noData = true;
        this.cdRef.markForCheck();
      }
    }
  }

  @Input() set generatedReport(value: ReportDataResponse) {
    this._generatedReport = value;
    this.loadReport();
  }

  loadReport() {
    if (!!this._generatedReport) {
      let uncodedDAta;
      if (!!this._generatedReport.data.bytes) {
        uncodedDAta = atob(this._generatedReport.data.bytes);
      } else {
        uncodedDAta = atob(this._generatedReport.data.data);
      }
      
      const byteArray = new Uint8Array(uncodedDAta.split('').map(char => char.charCodeAt(0)));


      let blob;
      if (!!this._generatedReport.isPdf)
        blob = new Blob([byteArray], {type: 'application/pdf'});
      else
        blob = new Blob([byteArray], {type: 'text/html'});

      const url = window.URL.createObjectURL(blob);
      this.reporFile = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      this.getLoading = false;
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    }
  }

  public toBinaryStr(str: string) {
    const encoder = new TextEncoder();
    // 1: split the UTF-16 string into an array of bytes
    const charCodes = encoder.encode(str);
    // 2: concatenate byte data to create a binary string
    return String.fromCharCode(...charCodes);
  }

  public copyLink() {
    if (!!this._generatedReport) {
      this.clipboard.copy(`${this.originUrl}/report/info/${this._generatedReport?.path}`);
      this.snackBar.open(`${this.translate.instant('REPORT.LINK_COPIED')}`, '', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
    } else {
      this.snackBar.open('' , '', { panelClass: 'error', verticalPosition: 'top', duration: 2000 });

    }
  }

  public getReportIcon(type: ReportTypes): string {
    if (type == ReportTypes.CF) {
      return 'assets/icons/carfax-sm.png';
    }
    if (type == ReportTypes.ST) {
      return 'assets/icons/window-stickers.png';
    }
    if (type == ReportTypes.AC) {
      return 'assets/icons/auto-check.png';
    }
    return '';
  }
}
