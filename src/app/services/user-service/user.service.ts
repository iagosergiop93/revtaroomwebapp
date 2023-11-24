import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { TrainingType } from 'src/app/models/training-type';
import { stringify } from '@angular/compiler/src/util';
import { UserBio } from 'src/app/models/user-bio';

@Injectable({
  	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) {}
	getUserProfile = () => {
		console.log("userService getUserProfile called");
		console.log("Using (-"+localStorage.getItem('ratjwt')+"-) as our token");
		return this.http.get(`${env.API_URL}/profile`,
		{headers: {"Authorization": localStorage.getItem('ratjwt')},
		observe: 'response'}).pipe(
			map(resp => {
				return resp;
			})
		);
	}

	updateUserProfile = (description:string, trainingType: TrainingType) => {
		console.log("Whats to be sent");
		console.log({description, trainingType});
		let userProfile = {
			"description":description,
			"trainingType":(trainingType).toString()

		};
		console.log("With - " + localStorage.getItem('ratjwt'));
		return this.http.put(`${env.API_URL}/profile`, userProfile,
		{headers: {"Authorization": localStorage.getItem('ratjwt')},
		observe: 'response'}).pipe(
			map(resp => {
				return resp;
			})
		);
	}

	// register(user: User) {
    //     return this.http.post(`${env.API_URL}/users/register`, user);
	// }
	
	register(email, firstName, lastName, password, username): Observable<any> {
		let values = {email, firstName, lastName, password, username};
		return this.http.post(`${env.API_URL}/users/register`, values, { observe: 'response'}).pipe(
			map(res => {
				let user = res.body as User;
				console.log(user);
			})
		)
	}
}
