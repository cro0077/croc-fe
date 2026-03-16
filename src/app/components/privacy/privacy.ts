import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatAnchor, MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface ContactUsData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [
    TranslateModule,
    MatButtonModule
],
  templateUrl: './privacy.html',
  standalone: true,
  styleUrl: './privacy.scss'
})
export class Privacy implements OnInit, AfterViewInit {

  constructor(
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
