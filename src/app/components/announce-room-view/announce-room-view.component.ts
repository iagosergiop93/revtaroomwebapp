import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingInfo } from 'src/app/models/housing-info';
import { HousingInfoService } from 'src/app/services/housing-service/housing-info.service';
import { RoomToRent } from 'src/app/models/RoomToRent';

@Component({
  selector: 'app-announce-room-view',
  templateUrl: './announce-room-view.component.html',
  styleUrls: ['./announce-room-view.component.scss']
})
export class AnnounceRoomViewComponent implements OnInit {

	housings: HousingInfo[] = [];

	constructor(
		private housingService: HousingInfoService,
		private router: Router
	) { }

	ngOnInit() {
		// Get rooms by id
		this.housingService.getRoomsByUserId()
		.subscribe(
			(res:any) => {
				let aux = res.body as any[];
				aux.forEach((item) => {
					this.housings.push({
						address: item.house.address,
						description: item.house.description,
						pricePerMonth: item.pricePerMonth
					});
				});
			},
			(err) => {
				console.log("Something went wrong");
			}
		);
	}

	goToRoom(housing?: any) {
		if(housing) {
			housing.stringAddress = JSON.stringify(housing.address);
			this.router.navigate(["/dashboard/announce"], { queryParams: housing });
		}
		else this.router.navigate(["/dashboard/announce"]);
	}

}
