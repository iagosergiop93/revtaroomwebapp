import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NavbarService {

	navbarSubject: BehaviorSubject<void>;
	sidenav$: Observable<void>;

	constructor() {
		this.navbarSubject = new BehaviorSubject<void>(null);
		this.sidenav$ = this.navbarSubject.asObservable();
	}



}
