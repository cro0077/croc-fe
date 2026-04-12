import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindReportsResponse, ReportDataResponse, ReportRequest, VinKeyResponse } from '../../../../services/models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReportVinComponent } from '../report-vin/report-vin.component';
import { ReportInfoComponent } from '../report-info/report-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ReportService } from '../../../../services/report/report.service';
import { Subscription } from 'rxjs';
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-report-gen',
  standalone: true,
  imports: [MatProgressSpinnerModule, TranslateModule,
    ReportVinComponent, ReportInfoComponent, MatMenuModule],
  templateUrl: './report-gen.component.html',
  styleUrl: './report-gen.component.scss'
})
export class ReportGenComponent {

  //vin component
  public generatedReport?: ReportDataResponse;
  public showConfirmBtn = true;
  public searchLoading = false;
  public searchNotFoundError = false;
  public searchBaseError = false;

  public vin?: string;
  public key?: string;
  public reportInfo?: FindReportsResponse;

  public getLoading = false;
  public noCreditsError = false;
  
  findVinSubscription?: Subscription;
  getReportWithKeySubscription?: Subscription;

  constructor(
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private reportService: ReportService,
              private translate: TranslateService,
              private cdRef: ChangeDetectorRef
  ) {
    const d = this.activatedRoute.snapshot.paramMap.get('d');
    if (!!d)
      this.reportInfo = JSON.parse(d);
    this.vin = this.activatedRoute.snapshot.paramMap.get('vinId')!;
    this.key = this.activatedRoute.snapshot.queryParamMap.get('key') ?? undefined;
  }

  onConfirmReportSearch(vinKey: VinKeyResponse) {
    
      if (!!vinKey.vin) {
        this.searchLoading = true;
        this.findVinSubscription = this.reportService.find(
          {
            vin: vinKey.vin,
            key: vinKey.key
          }
        ).subscribe({
        next: res => {
          this.reportInfo = res;
          this.showConfirmBtn = false;
          this.searchLoading = false;
          this.searchNotFoundError = false;
          if (!!this.searchBaseError) {
            this.searchBaseError = false;
          }
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        },
        error: err => {
          let isNoFound = false;
          if (!!err && err.status == 404) {
            this.searchNotFoundError = true;
            isNoFound = true;
          } else {
            this.searchBaseError = true;
          }
          this.searchLoading = false;
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();

          if (!isNoFound) {
            throw err;
          }
        }});
      }
  }

  onReportChoosen(request: ReportRequest) {

    if (!!request && !!request.type && !!request.vin) {
      if (!!request.priceReport && !!request.priceReport.isLogIn &&
                  !!request.key && !!request.priceReport.numReports && request.priceReport.numReports > 0) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: this.translate.instant('REPORT.DO_YOU_WANT') + request.vin, // `Do You Want to Get Report For Vin ${this.vin}`,
            message: this.translate.instant('REPORT.YOU_HAVE') + request.priceReport.numReports + this.translate.instant('REPORT.REPORTS_LEFT') //`You have ${priceReport.numReports} reports left`,
          }
        });

        dialogRef.afterClosed().subscribe(res => {
            if(!!res) {
              this.getLoading = true;
              this.cdRef.markForCheck();
              this.getReportWithKeySubscription = this.reportService.getReportWithKey(request.type, request.vin, request.key!).subscribe({
                
                next: res => {
                  this.generatedReport = res.report;
                  let selectedReportInfo = this.reportInfo?.infos.find(el => el.type == request.type);
                  if (!!selectedReportInfo) {
                    if (!!res.numLeftReports && !!selectedReportInfo.price && !!selectedReportInfo.price.numReports) {
                      selectedReportInfo.price.numReports = res.numLeftReports;
                    }
                    selectedReportInfo.disable = true;
                  }
                  this.getLoading = false;
                  this.cdRef.markForCheck();
                  this.cdRef.detectChanges();
                },
                error: err => {
                  if (err.status == 402 && !this.noCreditsError) {
                    this.noCreditsError = true;
                    this.getLoading = false;
                    this.cdRef.markForCheck();
                    this.cdRef.detectChanges();
                  }
                  throw err;
                }
              }) 
            }
          }
        );
      } else {
        this.route.navigate([`/croco/${request.type}/${request.vin}`],
            {queryParams: {key: request.key}});
      }

    }

  }

  
  ngOnDestroy(): void {  
    if (!!this.findVinSubscription) {
      this.findVinSubscription.unsubscribe();
    }
    if (!!this.getReportWithKeySubscription) {
      this.getReportWithKeySubscription.unsubscribe();
    }
  }
}
