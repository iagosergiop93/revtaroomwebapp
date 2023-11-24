import { Component, OnInit } from '@angular/core';
import { HousingInfoService } from '../../services/housing-service/housing-info.service';
import { HousingInfo } from 'src/app/models/housing-info';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-housing-info',
  templateUrl: './housing-info.component.html',
  styleUrls: ['./housing-info.component.scss']
})
export class HousingInfoComponent implements OnInit {

	constructor(
		private _snackbar: MatSnackBar,
		private housingService: HousingInfoService) {

	}

	ngOnInit() {
		
	}

	onSubmit(housing: HousingInfo) {

		console.log(housing);

		this.housingService.getCoordinates(housing)
		.subscribe((res:any) => {
			console.log(res.results);
			let coords = res.results[0].geometry;
			housing.address.latitude = coords.lat + "";
			housing.address.longitude = coords.lng + "";

			this.housingService.sendHousing(housing).subscribe(
			(res) => {
				console.log(res);
				this.openSnackBar("You successfully added a new housing.");
			}, err => {
				console.log(err);
				this.openSnackBar("Some error happened. Please try again later.");
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
