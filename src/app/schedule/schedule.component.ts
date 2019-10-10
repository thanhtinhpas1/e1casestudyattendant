import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ScheduleService } from '../shared/services/schedule.service';
import { AppService } from '../shared/services/app.service';
import { AuthService } from '../shared/services/auth.service';
@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {
    public constructor(public  scheduleService: ScheduleService, public  appService: AppService,
         public  router: Router,
    	public  authService: AuthService) {}

    public ngOnInit() {
        
    }
}
