import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {DataService} from "../../service/data.service";

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import {delay} from "rxjs/operators";
import {lastValueFrom} from "rxjs";
import {parseJson} from "@angular/cli/utilities/json-file";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:any;
  data: any;
  modalRef = new BsModalRef();
  selectedEmployee: any;

  response: any;

  constructor(private modalService: BsModalService, private dataService: DataService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeesData().then(r => {
      return ;
    });
  }

  async getEmployeesData() {
    const response$ = this.dataService.getData();
    this.response = await lastValueFrom(response$);
    this.employees = this.response.data;
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.selectedEmployee = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteData(this.selectedEmployee);
    this.selectedEmployee = null;
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
    this.selectedEmployee = null;
  }

  deleteData(id: any) {
    this.dataService.deleteData(id).subscribe(res => {
      this.data = res;
      if (this.data.status === 1) {
          this.toastr.warning(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
            timeOut: 3000,
            progressBar: true
          });
      } else {
          this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
            timeOut: 3000,
            progressBar: true
          });
      }
      this.getEmployeesData();
    });
  }

}
