import { Injectable } from '@angular/core';
import { UsStates } from '../../utils/us-states';
import { HttpClient } from '@angular/common/http';
import { HousingInfo } from 'src/app/models/housing-info';
import { environment as env } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { Address } from 'src/app/models/address';
import { RoomToRent } from 'src/app/models/RoomToRent';


@Injectable({
  providedIn: 'root'
})
export class HousingInfoService {

	states = (new UsStates()).states;

	constructor(
		private authService: AuthService,
		private http: HttpClient)
	{
			
	}

	getCoordinates(housing: HousingInfo ) {
		let query = this.encodeAddress(housing.address);
		return this.http.get(`${env.GEO_CODE}${query}${env.GEO_CODE_KEY}`);
	}

	private encodeAddress(addr: Address) {
		let str = addr.streetAddress + " " +  addr.city + " " + addr.state + " United States";
		// str = encodeURIComponent(str);
		str = str.replace(new RegExp(" ", 'g'), "+");
		console.log(str);
		return str;
	}

	// Housing
	getHousing() {
		return this.http.get(`${env.API_URL}/housing`);
	}

	sendHousing(housing: HousingInfo) {
		let token = this.authService.getToken();
		return this.http.post(`${env.API_URL}/housing`, housing, { observe: 'response', headers: { "Authorization": token }});
	}

	// Room for Rent
	getRooms() {
		return this.http.get(`${env.API_URL}/rent`);
	}

	getRoomsByUserId() {
		let token = this.authService.getToken();
		let userId = this.authService.principal.id;
		return this.http.get(`${env.API_URL}/rent/${userId}`, { observe: 'response', headers: { "Authorization": token }});
	}

	sendRoomForRent(housing: HousingInfo) {
		let token = this.authService.getToken();
		return this.http.post(`${env.API_URL}/rent`, housing, { observe: 'response', headers: { "Authorization": token }});
	}

}
