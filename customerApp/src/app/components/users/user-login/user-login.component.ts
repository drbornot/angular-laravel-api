import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../../service/data.service";
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  form: any;
  submitted = false;
  data: any;
  token: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router: Router) { }

  createForm() {
    this.form = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  login() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.dataService.login(this.form.value).subscribe(res => {
        this.data = res;
        if (this.data.status === 1) {
          this.token = this.data.usertoken;
          localStorage.setItem('token', this.token);
          sessionStorage.setItem('plainTextToken',this.data.plainTextToken);
          this.router.navigate(['/']);
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
              timeOut: 3000,
              progressBar: true
          });
        } else if(this.data.status === 0) {
          this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
            timeOut: 3000,
            progressBar: true
          });
        }
    });

  }

}
