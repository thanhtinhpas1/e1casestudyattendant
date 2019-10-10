import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { CheckAttendanceService } from '../shared/services/check-attendance.service';
import { AppConfig } from '../shared/config';
import { AuthService } from '../shared/services/auth.service';
import { AttendanceService } from '../shared/services/attendance.service';
import { AppService } from '../shared/services/app.service';
declare var jQuery:any;
@Component({
    selector: 'app-check-attendance',
    templateUrl: './check-attendance.component.html'
})
export class CheckAttendanceComponent implements OnInit {
    public constructor(public checkAttendanceService : CheckAttendanceService,public appConfig: AppConfig,
        public authService: AuthService, public attendanceService: AttendanceService, 
        public localStorage: LocalStorageService, public appService: AppService, public router: Router) {

    }
    public ngOnInit() {
        
    }
}
