import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeeEditComponent} from "./components/employee-edit/employee-edit.component";
import {EmployeeAddComponent} from "./components/employee-add/employee-add.component";
import {UserRegisterComponent} from "./components/users/user-register/user-register.component";
import {UserLoginComponent} from "./components/users/user-login/user-login.component";

import {AuthGuard} from "./auth.guards";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employees'
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/add',
    component: EmployeeAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
