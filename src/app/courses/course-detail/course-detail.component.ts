import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../../shared/services/app.service';
import { AuthService } from '../../shared/services/auth.service';
declare let jQuery: any;
@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {
   

    public constructor(public  route: ActivatedRoute, public  router: Router,
        public  appService: AppService, public  authService: AuthService) {}

    
    public ngOnInit(): void {
    }
}
