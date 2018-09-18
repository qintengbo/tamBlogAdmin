import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpRequestService } from '../httpRequest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(validateForm): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (validateForm.valid) {
      this.httpRequestService.loginRequest(validateForm.value)
      .subscribe(res => console.log(222, res));
    }
  }

  constructor(
    private fb: FormBuilder,
    private httpRequestService: HttpRequestService
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

}
