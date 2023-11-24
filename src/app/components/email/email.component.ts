import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/services/email-service/email.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
	emailForm: FormGroup;
	endThing;
	emailText;
	username;
	email;

	constructor(private formBuilder: FormBuilder,private emailService: EmailService, private userService: UserService) {
		console.log("EmailComponent instantiating...");
	}

	ngOnInit() {
		this.emailForm = this.formBuilder.group({
			email: [""]
		})

		this.userService.getUserProfile().subscribe(
			(resp) => {
				this.endThing = resp.body;
				console.log(this.endThing);
				this.username = (this.endThing.username);
				console.log(this.username);
				this.email = (this.endThing.profile.email);
				console.log(this.email);
				console.log("Done filling onInit email info");
			},
			(err) => {
				console.log("Problem in EmailComponent.ts onInit");
				console.log(err);
			}
		)
	}

	get fields() {
		return this.emailForm.controls;
	}
	
	onSubmit = () => {
		console.log("Send Pressed");
		this.emailText = this.fields.email;
		this.emailService.sendEmail(
			this.username,
			this.email,
			this.emailText
		)
	}
}
