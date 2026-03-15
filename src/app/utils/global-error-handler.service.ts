import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar) {
  }
  handleError(error: any): void {
    //HttpErrorResponse is the error from end-point
    this.snackBar.open('Error Please try again', 'x', { panelClass: 'errror', verticalPosition: 'top', duration: 15000 });
    console.error(error);
  }
}
