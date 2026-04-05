import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FindReportsResponse, Price, ReportRequest, ReportTypes, VinKeyResponse } from '../../../../services/models';
import { ReportService } from '../../../../services/report/report.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DealsComponent } from '../../deals/deals';

@Component({
  selector: 'app-report-vin',
  standalone: true,
  imports: [MatProgressSpinnerModule, TranslateModule, MatButtonModule, 
            MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,
            MatAccordion, MatExpansionModule, DealsComponent],
  templateUrl: './report-vin.component.html',
  styleUrl: './report-vin.component.scss',
  providers: [DecimalPipe]
})
export class ReportVinComponent implements OnDestroy {


  @Output() onReportChoosen: EventEmitter<ReportRequest> = new EventEmitter<ReportRequest>();
  @Output() onConfirmReportSearch: EventEmitter<VinKeyResponse> = new EventEmitter<VinKeyResponse>();

  @Input() vin?: string | null;
  @Input() key?: string;
  @Input() reportInfo?: FindReportsResponse;
  @Input() showConfirmBtn = true;
  @Input() searchLoading = false;
  @Input() searchNotFoundError = false;
  @Input() searchBaseError = false;


  public infoForm?: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private decimalPipe: DecimalPipe,
              private cdRef: ChangeDetectorRef) {
  }

  // findVinSubscription?: Subscription;
  
  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      vin: [this.vin, {nonNullable: true, validators: [Validators.required, Validators.maxLength(17), Validators.minLength(17)]}],
      key: [this.key, {nonNullable: false, validators: [Validators.minLength(4)]}]
    });
    if (!!this.vin && !!this.reportInfo)
      this.showConfirmBtn = false;
  }

  @Input() set showConfirm(value: boolean) {
    this.showConfirmBtn = value;
    if (!this.showConfirmBtn) {
      this.infoForm?.disable();
    } else {
      this.infoForm?.enable();
    }
  }

  public onConfirm() {
    if (!!this.infoForm!.valid) {
      this.vin = this.infoForm?.get('vin')?.value.trim();
      this.key = this.infoForm?.get('key')?.value?.trim();
      if (!!this.vin) {
        this.onConfirmReportSearch.emit({
          vin: this.vin,
          key: this.key
        });

        // this.searchNotFoundError = false;
        // this.searchBaseError = false;
        // this.searchLoading = true;
        // const key = this.infoForm?.get('key')?.value?.trim();
        
        // this.findVinSubscription = this.reportService.find(
        //   {
        //     vin: this.vin,
        //     key: key
        //   }
        // ).subscribe({
        // next: res => {
        //   this.reportInfo = res;
        //   this.showConfirmBtn = false;
        //   this.infoForm!.disable();
        //   this.searchLoading = false;
        //   this.cdRef.markForCheck();
        //   this.cdRef.detectChanges();
        // },
        // error: err => {
        //   if (!!err && err.status == 404) {
        //     this.searchNotFoundError = true;
        //     this.searchLoading = false;
        //   }
        //   this.searchLoading = false;
        //   this.searchBaseError = true;
        //   this.cdRef.markForCheck();
        //   this.cdRef.detectChanges();
        //   throw err;
        // }});
      }
    }
  }

  public getReport(vin: string, num: string, type: ReportTypes, priceReport?: Price) {
    if (!!type && !!priceReport) {
      const key = this.infoForm?.get('key')?.value?.trim();
      // if (!!vin && !!key && !!priceReport.isLogIn && priceReport.numReports && priceReport.numReports > 0) {

      //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //     data: {
      //       title: this.translate.instant('REPORT.DO_YOU_WANT') + vin, // `Do You Want to Get Report For Vin ${vin}`,
      //       message: this.translate.instant('REPORT.YOU_HAVE') + priceReport.numReports + this.translate.instant('REPORT.REPORTS_LEFT') //`You have ${priceReport.numReports} reports left`,
      //     }
      //   });
        
      //   dialogRef.afterClosed().subscribe(res => {
      //       if(!!res) {
      //         // this.reportService.getReportWithKey(type, vin, key).subscribe(res => {

      //         // })
      //       }
      //     });


      // } else {
        this.onReportChoosen.emit({
          vin: vin,
          type: type,
          num: num,
          key: key,
          priceReport: priceReport
        });
      // }
    }
  }

  public getPrice(num: number): any {
    return this.decimalPipe.transform(num, '1.2-2');
  }

  public onCancel() {
    this.infoForm?.get("vin")?.reset();
    this.infoForm?.get("vin")?.setValue('');
    this.vin = null;
    this.showConfirmBtn = true;
    this.infoForm!.enable()
    this.reportInfo = undefined;
  
    this.searchNotFoundError = false;
    this.searchBaseError = false;
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

  ngOnDestroy(): void {  
    // if (!!this.findVinSubscription) {
    //   this.findVinSubscription.unsubscribe();
    // }
  }
}
