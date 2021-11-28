import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { EmployeesComponent } from './components/employees/employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';

import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from "./auth.guards";
import { UserLogoutComponent } from './components/users/user-logout/user-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    NavbarComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    UserRegisterComponent,
    UserLoginComponent,
    HomeComponent,
    UserLogoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
