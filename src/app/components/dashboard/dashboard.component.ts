import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar-service/navbar.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	opened: boolean = true;

	constructor(
		private router: Router,
		private authService: AuthService,
		private navbar: NavbarService) {
		
	}

	ngOnInit() {
	}

	toggle() {
		console.log("Burguer");
		this.opened = !this.opened;
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	} 

	

}
