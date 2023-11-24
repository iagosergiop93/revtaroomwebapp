import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ValidatorsService } from 'src/app/services/validator-service/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    firstName: string;
    lastName: string;
    username: string;
    email:string;
	emailError = false;
	password:string;
    passError = false;
    
    errorMessage:string;


    constructor(
        private router: Router,
        private userService: UserService,
        private validator: ValidatorsService,
        private alertService: AlertService
    ) 
    { 
    }

    ngOnInit() {
    }

    submitReg() {
       // Validation
       
		this.emailError = !this.validator.email(this.email);
		this.passError = !this.validator.password(this.password);
		if(this.emailError || this.passError) return;
        

       console.log('Valid registration form');

        this.userService.register(this.email, this.firstName, this.lastName, this.password, this.username)
            .subscribe((resp) => {
                console.log(resp);
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.errorMessage = error.message as string;
                    alert(this.errorMessage);
                    this.alertService.error(error);
                })
    }

    goToLogin() {
        this.router.navigate(["/login"]);
    }

}
