import { Component, OnInit } from '@angular/core';
import { HousingInfoService } from 'src/app/services/housing-service/housing-info.service';
import { HousingInfo } from 'src/app/models/housing-info';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-announce-room',
  templateUrl: './announce-room.component.html',
  styleUrls: ['./announce-room.component.scss']
})
export class AnnounceRoomComponent implements OnInit {

	housingToView: any;
	edit: boolean = true;

	constructor(
		private _snackbar: MatSnackBar,
		private route: ActivatedRoute,
		private housingService: HousingInfoService) { }

	ngOnInit() {
		this.route.queryParams.subscribe((housing) => {
			console.log("In AnnounceRoomComponent...");
			console.log("Housing", housing);
			this.housingToView = housing;
			if(housing == {}) this.edit = false;
			
		});
	}

	onSubmit(housing: HousingInfo) {

		this.housingService.getCoordinates(housing)
		.subscribe((res:any) => {
			console.log(res.results);
			let coords = res.results[0].geometry;
			housing.address.latitude = coords.lat + "";
			housing.address.longitude = coords.lng + "";

			this.housingService.sendRoomForRent(housing).subscribe(
			(res) => {
				console.log(res);
				this.openSnackBar("You successfully announced a room!");
			}, err => {
				console.log(err);
			});

		}, (err) => {
			console.log(err);
		});
	}

	openSnackBar(message: string) {
		this._snackbar.open(message, "", {
		  duration: 2000,
		});
	}

}
