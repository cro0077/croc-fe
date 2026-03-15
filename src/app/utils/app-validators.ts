import { FormGroup, FormControl } from '@angular/forms';

export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
  }
  return {};
}

export function checkIds(a: any, b:any) {
  return a && b ? a.id == b.id : false;
}
