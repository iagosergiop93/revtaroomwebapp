import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Principal } from 'src/app/models/principal';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<Principal>;
	currentUser$: Observable<Principal>;

	principal:Principal;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<Principal>(null);
	    this.currentUser$ = this.currentUserSubject.asObservable();
	}

	authenticate(email, password): Observable<any> {
		let credentials = {email, password};
		return this.http.post(`${env.API_URL}/auth`, credentials, { observe: 'response'}).pipe(
			map(res => {
				let user = res.body as Principal;
				console.log(user);
				this.principal = user;
				this.saveToken(res.headers.get("Authorization"));
				this.currentUserSubject.next(user);
			})
		)
	}

	authToken(): Observable<any> {
		let token = this.getToken();
		if(!token) return new Observable((subscriber) => subscriber.error());
		return this.http.post(`${env.API_URL}/auth`, {}, { observe: 'response', headers: { "Authorization": token }}).pipe(
			map(res => {
				let user = res.body as Principal;
				console.log(user);
				this.principal = user;
				this.saveToken(res.headers.get("Authorization"));
				this.currentUserSubject.next(user);
			})
		)
	}

	logout() {
		localStorage.removeItem("ratjwt");
	}

	saveToken(token: string) {
		localStorage.setItem("ratjwt", token);
	}

	getToken():string {
		return localStorage.getItem("ratjwt");
	}

	isAuthenticated(): boolean {
		const token = localStorage.getItem('ratjwt');
		// Check whether the token is expired and return
		// true or false
		if (token){
		return true;
		}
		return false;
	  }
	}

	

