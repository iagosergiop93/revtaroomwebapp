import { Component, OnInit, Output, EventEmitter, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HousingInfoService } from '../../services/housing-service/housing-info.service';
import { Address } from 'src/app/models/address';
import { HousingInfo } from 'src/app/models/housing-info';

@Component({
  selector: 'app-housing-form',
  templateUrl: './housing-form.component.html',
  styleUrls: ['./housing-form.component.scss']
})
export class HousingFormComponent implements OnInit, OnChanges, AfterViewInit {

	@Input("housingToView") housingToView: any = null;
	@Input("edit") edit = true;
	@Input("btnTitle") btnTitle = "Housing";
	@Output("formEvent") formEvent = new EventEmitter<HousingInfo>();

	housingForm: FormGroup;
	showForm:boolean = false;

	constructor(
		public housingService: HousingInfoService,
		private formBuilder: FormBuilder)
	{
		
	}

	ngOnChanges() {
		console.log("In ngOnChanges...");
		console.log("housing", this.housingToView);
		console.log("edit", this.edit);
	}

	ngOnInit() {
		console.log("In ngOnInit");
		this.housingForm = this.formBuilder.group({
			pricePerMonth: ['',Validators.required],
			description: [''],
			streetAddress: ['', Validators.required],
			houseNumber: [''],
			city: ['',Validators.required],
			state: ['', Validators.required],
			zipCode: ['']
		})
		console.log(this.housingForm);
		this.showForm = true;
	}

	get fields() {
		return this.housingForm.controls;
	}

	ngAfterViewInit() {
		console.log("In ngAfterViewInit...");
		// Filling Form if data was passed to this component
		if(this.housingToView) {
			console.log("About to set fields");
			let aux = JSON.parse(this.housingToView.stringAddress);
			console.log(this.housingForm);
			this.housingForm.controls.streetAddress.setValue(aux.streetAddress);
			this.housingForm.controls.houseNumber.setValue(aux.houseNumber);
			this.housingForm.controls.city.setValue(aux.city);
			this.housingForm.controls.state.setValue(aux.state);
			this.housingForm.controls.pricePerMonth.setValue(+this.housingToView.pricePerMonth);
			this.housingForm.controls.description.setValue(this.housingToView.description);
		}

		// Disable user to edit fields
		if(!this.edit) {
			let el = document.querySelectorAll("input");
			console.log("html",el);
			el.forEach(item => item.setAttribute("disabled", "disabled"));
			document.querySelector("textarea").setAttribute("disabled", "disabled");
		}
	}

	onSubmit() {
		if(this.housingForm.invalid) return;
		console.log("Submitted form");

		let addr: Address = {
			streetAddress: this.fields.streetAddress.value,
			houseNumber: this.fields.houseNumber.value,
			city: this.fields.city.value,
			state: this.fields.state.value,
			zipCode: this.fields.zipCode.value,
			latitude: null,
			longitude: null
		}

		let housing: HousingInfo = {
			pricePerMonth: this.fields.pricePerMonth.value,
			description: this.fields.description.value,
			address: addr
		}

		console.log(housing);

		this.formEvent.emit(housing);

	}

}
