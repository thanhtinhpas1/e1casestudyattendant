import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../shared/services/app.service';
import { FeedbackService } from '../shared/services/feedback.service';
import { AuthService } from '../shared/services/auth.service';
declare var jQuery:any;
@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
    
    public constructor(public  appService: AppService,
        public  feebackService: FeedbackService,public  authService: AuthService) {

    }
    public ngOnInit() {
    }
}
