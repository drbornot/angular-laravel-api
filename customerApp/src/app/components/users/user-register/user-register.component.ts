import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "../confirmed.validator";
import { DataService } from "../../../service/data.service";
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {

  form: any;
  submitted = false;
  data: any;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router: Router) { }

  createForm() {
    this.form = this.formBuilder.group({
      'name': [null, Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  register() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dataService.register(this.form.value).subscribe(res => {
      this.data = res;
      if (this.data.status === 1) {
        this.toastr.success('The User was registered successfully!', JSON.stringify(this.data.code), {
          timeOut: 3000,
          progressBar: true
        });

        this.submitted = false;
        this.form.get('name').reset();
        this.form.get('email').reset();
        this.form.get('password').reset();
        this.form.get('confirmPassword').reset();

        this.router.navigate(['/login']);

      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

}
