import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { HowToOrderComponent } from '../how-to-order/how-to-order.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HowToOrderComponent,
    TranslateModule, MatButton, MatInput, MatIcon,
    MatFormFieldModule, ReactiveFormsModule, MatError,
    MatCardModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  isBrowser = false;

  public infoForm?: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    this.infoForm = this.formBuilder.group({
      vin: '',
    });
  }
  
  public onConfirm() {
      const vin = this.infoForm?.get('vin')?.value.trim();
      this.router.navigate([`report/${vin}`])
  }
  
  ngOnDestroy(): void {
  }
  
}