import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import * as L from 'leaflet';
import { HousingInfo } from 'src/app/models/housing-info';

@Injectable({
  providedIn: 'root'
})
export class MapService {

	actualLayer: L.Layer;
	markerTitle = "Monthly price: $"

	constructor(private http: HttpClient) { }

	fillMapWithAvgPriceClusters(map: L.Map, list: HousingInfo[]) {
		
		let addressPoints: any[] = this.mapHousingIntoCoords(list);
		
		// Create cluster object and define its configuration
		let markers = L.markerClusterGroup({ 
			chunkedLoading: true,
			iconCreateFunction: (cluster) => {
				let children = cluster.getAllChildMarkers();
				let avg = 0;
				children.forEach(marker => {
					let value = +marker.options.title.replace(this.markerTitle, ""); // the plus sign is to convert from string to number
					avg += value;
				})
				avg = avg/children.length;
				return new L.DivIcon({
					html: '<div style="padding: 4px;border-radius: 50%;background: rgba(255,152, 0, 0.6);border: 1px solid #F57C00;"><span> $' + avg + '</span></div>',
					className: 'marker-cluster', iconSize: new L.Point(40, 40)
				})
			}
		});


		// Get addresses points and insert them in the cluster group
		for(let i=0;i<addressPoints.length;i++) {
			let a = addressPoints[i];
			let title = a[2];
			let marker = L.marker(L.latLng(a[0],a[1]), { title: title });
			marker.bindPopup(title);
			markers.addLayer(marker);
		}

		console.log("markers", markers);
		this.actualLayer = markers;
		// Add all the points to the map
		map.addLayer(markers);
		
	}

	fillMapWithCountClusters(map: L.Map, list: HousingInfo[]) {
		let addressPoints: any[] = this.mapHousingIntoCoords(list);

		// Create cluster object and define its configuration
		let markers = L.markerClusterGroup({ 
			chunkedLoading: true
		});

		// Get addresses points and insert them in the cluster group
		for(let i=0;i<addressPoints.length;i++) {
			let a = addressPoints[i];
			let title = a[2];
			let marker = L.marker(L.latLng(a[0],a[1]), { title: title });
			marker.bindPopup(
				`<div>
					<h4>$${list[i].pricePerMonth}</h4>
				</div>`
			);
			markers.addLayer(marker);
		}

		console.log("markers", markers);
		
		// Add all the points to the map
		map.addLayer(markers);
	}

	fillMapWithAvailableRooms(map: L.Map, list: any[]) {
		console.log(list);
		list = this.filterRoomsWithCoordinates(list);
		// Create cluster object and define its configuration
		let markers = L.markerClusterGroup({ 
			chunkedLoading: true
		});

		// Get addresses points and insert them in the cluster group
		for(let i=0;i<list.length;i++) {
			let marker = L.marker(L.latLng(+list[i].house.address.latitude,+list[i].house.address.longitude), { title: `$${list[i].pricePerMonth}` });
			marker.bindPopup(
				`<div>
					<h4>${list[i].house.user.firstName} ${list[i].house.user.lastName}</h4>
					<div>$${list[i].pricePerMonth}</div>
					<div>${list[i].house.user.email}</div>
				</div>`
			);
			markers.addLayer(marker);
		}

		console.log("markers", markers);
		
		// Add all the points to the map
		map.addLayer(markers);
	}

	private filterRoomsWithCoordinates(list: any[]) {
		let points = [];
		list.forEach(item => {
			if(item.house.address.latitude && item.house.address.longitude) {
				points.push(item);
			}
		});
		return points;
	}

	private mapHousingIntoCoords(list: HousingInfo[]) {
		let points = [];
		list.forEach(item => {
			if(item.address.latitude && item.address.longitude) {
				let lat = item.address.latitude;
				let lng = item.address.longitude;
				let price = this.markerTitle + item.pricePerMonth;
				points.push([lat, lng, price]);
			}
		});
		return points;
	}

}
