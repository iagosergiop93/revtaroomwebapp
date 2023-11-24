import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from 'src/app/services/validator-service/validators.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	email:string;
	emailError = false;
	password:string;
	passError = false;

	constructor(
		private router: Router,
		private authService: AuthService,
		private validator: ValidatorsService) { }

	ngOnInit() {
	}

	submitLogin() {
		console.log("In submitLogin...");
		
		// Validation
		this.emailError = !this.validator.email(this.email);
		this.passError = !this.validator.password(this.password);
		if(this.emailError || this.passError) return;

		console.log("Passed validators");

		// Send to server
		this.authService.authenticate(this.email, this.password)
		.subscribe((res) => {
			console.log(res);
			this.router.navigate(["/dashboard"]);
		},
		(err) => {
			console.log(err);
			
		})
	}

	goToRegister() {
		this.router.navigate(["/register"]);
	}

}