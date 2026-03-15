import { ChangeDetectorRef, Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PayType, PayUpdateResponse, Price, ReportTypes } from '../../../services/models';
import { PayService } from '../../../services/pay.service';
import { emailValidator } from '../../utils/app-validators';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { isPlatformBrowser } from '@angular/common';
import { ReportService } from '../../../services/report/report.service';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [TranslateModule, MatButtonModule, MatError, RouterOutlet,
    MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressSpinner],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss',
})
export class PayComponent {
  public type?: string | null;
  private isReportType = false;
  public vin?: string;
  public packageId?: number;

  public showActionButtons = true;
  public price?: Price;

  private payId?: number;

  public infoForm?: FormGroup;
  public loading = true;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private payService: PayService,
              private reportService: ReportService,
              private formBuilder: FormBuilder,
              private cdRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private readonly platformId: Object,
              // private commonService: CommonService
            ) {

    // this.type = this.activatedRoute.snapshot.paramMap.get('type');
    // let isValid = false;
    // if (!!this.type) {
    //   isValid = this.type in PayType;
    //   this.isReportType = this.type in ReportTypes;
    // }

    // if (!isValid) {
    //   this.onCancel();
    // }

    // const vinIdOrPackageParam = this.activatedRoute.snapshot.paramMap.get('vinId'); //it might be package num

    // if (!vinIdOrPackageParam) {
    //   this.onCancel();
    // }
    // this.showActionButtons = !this.route.url.includes("success") && !this.route.url.includes("failure");
    
    // if (this.type == PayType.PACF) {
    //   this.packageId = +vinIdOrPackageParam!;
    // } else {
    //   this.vin = vinIdOrPackageParam!;
    // }
  }

  ngOnInit() {

    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    let isValid = false;
    if (!!this.type) {
      isValid = this.type in PayType;
      this.isReportType = this.type in ReportTypes;
    }

    if (!isValid) {
      this.onCancel();
    }

    const vinIdOrPackageParam = this.activatedRoute.snapshot.paramMap.get('vinId'); //it might be package num

    if (!vinIdOrPackageParam) {
      this.onCancel();
    }
    this.showActionButtons = !this.route.url.includes("success") && !this.route.url.includes("failure");
    
    if (this.type == PayType.PACF) {  
      this.packageId = +vinIdOrPackageParam!;
    } else {
      this.vin = vinIdOrPackageParam!;
    }

    let key = undefined;
    if (!!this.activatedRoute.snapshot.queryParams &&
              !!this.activatedRoute.snapshot.queryParams['key'] &&
              this.activatedRoute.snapshot.queryParams['key'] != 'undefined') {
      key = this.activatedRoute.snapshot.queryParams['key'];
    }

    if (!this.price && !!this.showActionButtons && !!isPlatformBrowser(this.platformId)) {
      if (this.type == PayType.PACF && !!this.packageId) {
          this.reportService.price(this.type!, key, this.packageId).subscribe(el => {
              this.price = el;
              this.loading = false;
              if (!!this.price) {
                this.payService.initReport({
                    type: this.type as PayType,
                    paId: this.packageId
                }).subscribe((res: PayUpdateResponse) => {
                  this.payId = res.id;
                  this.loading = false;
                  this.cdRef.markForCheck();
                  this.cdRef.detectChanges();
                });
              }
            }
          );
        // numReports
      } else if (!!this.isReportType && !!this.vin) {
          this.reportService.price(this.type!, key).subscribe(el => {
              this.price = el;
              if (!!this.price) {
                this.payService.initReport({
                    type: this.type as PayType,
                    vin: this.vin
                }).subscribe((res: PayUpdateResponse) => {
                  this.payId = res.id;
                  this.loading = false;
                  this.cdRef.markForCheck();
                  this.cdRef.detectChanges();
                });
              }
            }
          );
      }
    } else {
      this.loading = false;
    }

    // const userInfo = this.commonService.tokenValidateAndGetFirstLastEmail();
    let name = "";
    let email = "";
    // if (!!userInfo.isValid) {
    //   name = userInfo.name;
    //   email = userInfo.email;
    // }
    this.infoForm = this.formBuilder.group({
      name: [name, {nonNullable: true, validators: [Validators.required, Validators.minLength(2)]}],
      email: [{value: email, disabled: email != "" ? true : false}, {nonNullable: true, validators: [Validators.required, Validators.email, emailValidator]}],
    });
  }

  public onConfirm() {
    if (!!this.payId && !!this.infoForm!.valid) {
      this.infoForm!.disable();
      this.payService.createReport({
        id: this.payId,
        type: this.type as ReportTypes,
        customerEmail: this.infoForm!.get('email')?.value,
        customerName: this.infoForm!.get('name')?.value
      }).subscribe(res => {
        window.open(res.url, "_self");
      });
    }
  }

  public onCancel() {
    this.route.navigate(['/']);
  }

  //vin report
  public getReportIcon(type: ReportTypes | string): string {
    if (type == ReportTypes.CF) {
      return 'assets/icons/carfax-sm.png';
    }
    if (type == ReportTypes.ST) {
      return 'assets/icons/window-stickers.png';
    }
    return '';
  }
}
