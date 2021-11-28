import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css', '../../../assets/bootstrap.min.css']
})
export class EmployeeAddComponent implements OnInit {

  form: any;
  submitted = false;
  data: any;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
        'name': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        'salary': ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  insertData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.dataService.insertData(this.form.value).subscribe(res => {
      this.data = res;
      if (this.data.status === 1) {
        this.toastr.success(this.data.message, this.data.code, {
          timeOut: 3000,
          progressBar: true
        });
        this.router.navigate(['/']);
      } else {
        this.toastr.error(this.data.message, this.data.code, {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }


}
