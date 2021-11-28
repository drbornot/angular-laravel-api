import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

import {ToastrService} from "ngx-toastr";
import {lastValueFrom} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  form: any;
  submitted = false;
  id = this.route.snapshot.params['id'];
  employee: any;
  data: any;

  message: string = "Uninitialized";
  response: any;

  constructor(private location: Location, private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.getDataById();
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

  async getDataById() {
    this.message = "Fetching...";
     const response$ = this.dataService.getDataById(this.id).pipe(delay(1000));
     this.response = await lastValueFrom(response$).then(res => {
       this.employee = res
       if (this.employee) {
         this.form.patchValue(this.employee);
       } else {
         this.toastr.error(JSON.stringify(this.employee.message), JSON.stringify(this.employee.status), {
           timeOut: 3000,
           progressBar: true
         });
         this.location.back();
       }
     });
    this.message = "Fetched";
  }

  updateData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.employee = Object.assign(this.employee, this.form.value);
    this.dataService.updateData(this.id,this.employee).subscribe(res => {
      this.data = res;
      if (this.data.status === 1) {
        this.toastr.success(this.data.message,this.data.code, {
          timeOut: 3000,
          progressBar: true
        });
        this.router.navigate(['/employees']);
      } else {
        this.toastr.error(this.data.message,this.data.code, {
          timeOut: 3000,
          progressBar: true
        });
      }
    })
  }

}
