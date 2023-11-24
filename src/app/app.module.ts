import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

// Angular Material
import { MaterialModule } from './modules/material.module';

// Services
import { NavbarService } from './services/navbar-service/navbar.service';
import { Guard }  from 'src/app/services/guard';

// Components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { UserBioComponent } from './components/user-bio/user-bio.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HousingInfoComponent } from './components/housing-info/housing-info.component';
import { AnnounceRoomComponent } from './components/announce-room/announce-room.component';
import { AnnounceRoomViewComponent } from './components/announce-room-view/announce-room-view.component';
import { HousingFormComponent } from './blocks/housing-form/housing-form.component';

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "email", component: EmailComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "dashboard", component: DashboardComponent, canActivate: [Guard], children: [
		{ path: "map", component: MapComponent },
		{ path: "home", component: HomeComponent },
		{ path: "userBio", component: UserBioComponent },
		{ path: "announce", component: AnnounceRoomComponent },
		{ path: "housing-info", component: HousingInfoComponent },
		{ path: "announcements", component: AnnounceRoomViewComponent },
		{ path: "", redirectTo: "home", pathMatch: "full" }
	] },
	{ path: "", redirectTo: "login", pathMatch: "full" }
]

@NgModule({
	declarations: [
		MapComponent,
		AppComponent,
		HomeComponent,
		LoginComponent,
		EmailComponent,
		UserBioComponent,
		RegisterComponent,
		DashboardComponent,
		HousingInfoComponent,
		HousingFormComponent,
		AnnounceRoomComponent,
		AnnounceRoomViewComponent
	],
	imports:[
		FormsModule,
		BrowserModule,
		MaterialModule,
		HttpClientModule,
		ReactiveFormsModule,
		LeafletModule.forRoot(),
		BrowserAnimationsModule,
		RouterModule.forRoot(routes),
		LeafletMarkerClusterModule.forRoot()
	],
	providers:[
		NavbarService,
		Guard
	],
	bootstrap:[AppComponent]
})

export class AppModule { }
