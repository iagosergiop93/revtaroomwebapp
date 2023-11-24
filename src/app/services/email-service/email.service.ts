import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class EmailService {
  	constructor(private http: HttpClient) { }

	sendEmail(username: string, email: string, emailText: string) {
		let letter = {username, email, emailText}
		return this.http.post(`${env.API_URL}/email`, letter,
		{headers: {"Authorization": localStorage.getItem('ratjwt')},
		observe: 'response'}).pipe(
			map(resp => {
				return resp;
			})
		);
	}

}
