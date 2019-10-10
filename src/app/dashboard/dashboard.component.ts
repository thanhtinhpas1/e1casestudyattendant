import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

	//public htmlContent: string = null;
	public userType: number = null;

	public role: object = null;

	public constructor(public  appService: AppService,public  authService: AuthService) {
	}

	public ngOnInit() {}
}
