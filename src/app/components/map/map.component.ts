import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map-service/map.service';
import { HousingInfo } from 'src/app/models/housing-info';
import { HousingInfoService } from 'src/app/services/housing-service/housing-info.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	map:L.Map;

	constructor(
		private housingService: HousingInfoService,
		private mapService: MapService) { }

	ngOnInit() {
		this.createMap();
		console.log("Map created");
	}

	selectClusterType(e) {
		let selection = +e.value;
		this.map.remove();
		this.createMap();
		switch(selection) {
			case 1:
				this.populateMapWithAvgPrice();
				break;
			case 2:
				this.populateMapWithAvailableRooms();
				break;
			case 3:
				this.populateMapWithCount();
				break;
		} 
	}

	createMap() {
		this.map = L.map('mapId').setView([35, -91.676174], 5,);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 18,
			minZoom: 4
        }).addTo(this.map);
	}

	populateMapWithAvgPrice() {
		console.log("In populate map without housing array");
		this.housingService.getHousing().subscribe(
			(res: any) => {
				let housingList = res as HousingInfo[];
				console.log("In populate map with housing array");
				this.mapService.fillMapWithAvgPriceClusters(this.map,housingList);
			},
			(err) => {

			}
		);
	}

	populateMapWithCount() {
		this.housingService.getHousing().subscribe(
			(res: any) => {
				let housingList = res as HousingInfo[];
				console.log("In populate map with housing array");
				this.mapService.fillMapWithCountClusters(this.map,housingList);
			},
			(err) => {

			}
		);
	}

	populateMapWithAvailableRooms() {
		this.housingService.getRooms().subscribe(
			(res: any) => {
				let roomList = res as any[];
				console.log("In populate map with housing array");
				this.mapService.fillMapWithAvailableRooms(this.map, roomList);
			},
			(err) => {

			}
		);
	}

	goToAnnouncement(obj) {
		console.log(obj);
	}



}
