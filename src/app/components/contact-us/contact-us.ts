import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
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
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    TranslatePipe,
    MatIcon,
    MatButton,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './contact-us.html',
  standalone: true,
  styleUrl: './contact-us.scss'
})
export class ContactUs implements OnInit, AfterViewInit {
  contactForm!: FormGroup;
  contactUsData: ContactUsData | null = null;
  submitting = false;
  submitted = false;
  errorMessage = '';

  constructor(
      private readonly fb: FormBuilder,
      private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.maxLength(500)]],
      numRequests: ['', [Validators.pattern("^[0-9]+")]],
      numPerMonthRequests: ['', [Validators.pattern("^[0-9]+")]],
    });
  }

  ngAfterViewInit(): void {
  }

  onSubmit(): void {
    if (!this.contactForm.valid || this.submitting) return;

    this.submitting = true;
    this.contactUsData = this.contactForm.value as ContactUsData;
    this.sendEm();
  }


  private sendEm() {
    const body = this.contactForm.value;
    body.apikey = "06a0b636-2973-485d-92c8-b72b903e9df4";
    // body.access_key = "06a0b636-2973-485d-92c8-b72b903e9df4";
    
    this.http.post('https://api.web3forms.com/submit', body, {
      headers: { 
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    }).subscribe({
      next: (val: any) => {
        this.submitting = false;
        this.submitted = true;
        this.errorMessage = '';
        this.contactForm.disable();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = 'Submission failed. Please try again.';
        throw err;
      }
    });
  }
}
