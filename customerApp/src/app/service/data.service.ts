import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {Employee} from "../classes/employee";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: any;
  constructor(private httpClient: HttpClient) {
  }

  get httpHeaders() {
    this.token = sessionStorage.getItem('plainTextToken');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  register(data: any) {
    return this.httpClient.post('http://laravel_api.code/api/register', data);
  }

  login(data: any) {
    return this.httpClient.post('http://laravel_api.code/api/login', data);
  }

  logout() {
    return this.httpClient.post('http://laravel_api.code/api/logout',null, { headers: this.httpHeaders });
  }

  getData() {
    return this.httpClient.get('http://laravel_api.code/api/employees',{ headers: this.httpHeaders});
  }

  getDataById(id: any) {
    return this.httpClient.get('http://laravel_api.code/api/employee/' + id,{ headers: this.httpHeaders});
  }

  insertData(employee: Employee) {
    return this.httpClient.post('http://laravel_api.code/api/employee/add', employee,{ headers: this.httpHeaders});
  }

  updateData(id: any, employee: Employee) {
    return this.httpClient.put('http://laravel_api.code/api/employee/edit/' + id, employee,{ headers: this.httpHeaders});
  }

  deleteData(id: any) {
    return this.httpClient.delete('http://laravel_api.code/api/employee/delete/' + id,{ headers: this.httpHeaders});
  }
}
