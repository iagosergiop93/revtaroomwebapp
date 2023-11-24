import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { UserBio } from 'src/app/models/user-bio';
import { TrainingType } from 'src/app/models/training-type';

@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./user-bio.component.css']
})
export class UserBioComponent implements OnInit {
	userBioForm: 	FormGroup;
	errorTag=		false;
	endThing;
	currentAbtMe;
	sentTypeObj:	TrainingType;
	sentBio;
	username=		"Loading";
	trainingType=	"Not Defined";
	trainingTypeNum=	1;

	constructor(private formBuilder: FormBuilder, private userService: UserService) {
		console.log("UserBioComponent instantiating...");
		console.log("UserBioComponent Finished");
	}

	ngOnInit() {
		console.log("In Bio ngOnInit");
		
		//check db for any pre existing bio info to fill the current* vars
		this.userService.getUserProfile().subscribe(
			(resp) => {
				console.log(resp.body);
				this.endThing = resp.body;
				this.currentAbtMe = (this.endThing.profile.description);
				console.log(this.currentAbtMe);
				this.username = (this.endThing.username);
				console.log(this.username);
				this.trainingType = (this.endThing.profile.trainingType.name);
				console.log(this.trainingType);
				this.trainingTypeNum = (this.endThing.profile.trainingType.id);
				console.log(this.trainingTypeNum);

				console.log("Done filling onInit Profile Filling");
			},
			(err) => {
				console.log("Problem in userBio.Component.ts on get");
				console.log(err);
			}
		)
		this.userBioForm = this.formBuilder.group({
			abtMe: [this.currentAbtMe],
			training: [this.trainingTypeNum]
		})
		console.log("Leaving Bio ngOnInit");
	}

	get fields() {
		return this.userBioForm.controls;
	}

	onSubmit = () => {
		console.log("Update Pressed");
		this.currentAbtMe = this.fields.abtMe.value//needs to be here b/c it wont grab updated values
		console.log(this.currentAbtMe+" - "+this.fields.training.value);
		this.sentTypeObj = new TrainingType(this.fields.training.value," ");
		// console.log(this.sentTypeObj);
		// this.sentBio = new UserBio(1,this.currentAbtMe,this.sentTypeObj);
		this.userService.updateUserProfile(
			this.currentAbtMe,
			this.fields.training.value
		).subscribe(
			(resp) => {
				console.log(resp);
			},
			(err) => {
				console.log("Problem in userBio.Component.ts on submit");
				console.log(err);
			}
		);
	}
}
