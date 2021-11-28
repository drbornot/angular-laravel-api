import { Component, OnInit } from '@angular/core';
import { DataService } from "../../service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  get isLogged() {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.dataService.logout().subscribe(res => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('plainTextToken');
      this.router.navigate(['/login']);
    });
  }

}
