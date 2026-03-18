import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from "@angular/material/menu";
import { MatButton } from '@angular/material/button';
import { ZeroConfComponent } from '../a_zero/conf';
import { RouterModule } from '@angular/router';
import { Deal } from '../../../services/models';
import { Router } from '@angular/router';
import { DealsService } from '../../../services/deals.service';
import { MatInput } from '@angular/material/input';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [TranslateModule, RouterModule, MatMenuModule, MatButton, MatInput, ZeroConfComponent],
  templateUrl: './deals.html',
  styleUrl: './deals.scss'
})
export class DealsComponent {

  packageDeals: Deal[] = [];
  pricePerOne: number = 3.99;
  priceCustom: number = 3.99;

  smPackageDeal: any[] = [];
  bgPackageDeal: any[] = [];

  constructor(private router: Router,
              private dealsServive: DealsService,
              private cdRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {
  }

  ngOnInit() {
    if(!!isPlatformBrowser(this.platformId)) {
      this.dealsServive.getAllDeals().subscribe((res: Deal[]) => {
        res.sort((a,b)=>{ return a.num < b.num ? -1 : 1; })
        const dealPerOne = res.find(el => el.num == 1);
        if (!!dealPerOne) {
          this.pricePerOne = dealPerOne.price;
        }
        this.packageDeals = res;
        this.smPackageDeal = this.packageDeals.filter(el => el!.num < 200);
        this.bgPackageDeal = this.packageDeals.filter(el => el!.num >= 200);
        this.cdRef.detectChanges();
      });
    }
  }

  public goToDeal(deal: Deal) {
    if (!!deal) {
      if (deal.num == 1) {
        this.router.navigateByUrl('/report');
      } else {
        this.router.navigate([`/croco/${deal.type}/${deal.id}`]);
      }
    }
  }
  public customCalc(val: string | number) {
    val = +val;
    if (val > 0) {
      const newPricePerOneIndex = this.packageDeals.findIndex(el => el.num > val) - 1;
      if (newPricePerOneIndex >= 0 && newPricePerOneIndex <= this.packageDeals.length) {
        this.priceCustom = this.packageDeals[newPricePerOneIndex].price;
      } else {
        this.priceCustom = this.packageDeals[this.packageDeals.length -1].price;
      }
    } else {
        this.priceCustom = this.pricePerOne;
    }
  }

}
