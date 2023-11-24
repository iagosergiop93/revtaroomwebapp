import { User } from './user';
import { UserBio } from './user-bio';
import { Address } from './address';

class UserAndProfile {
	user: User;
	profile: UserBio;
	address: Address;
}

class House {
	id:number;
	description: string;
	pricePerMonth: number;
	user: UserAndProfile;
	address: Address;
}

export class RoomToRent {

	id: number;
	pricePerMonth: number;
	status: any;
	house: House;

}
