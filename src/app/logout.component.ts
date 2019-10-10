import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
@Component({
    selector: 'app-logout',
    template: '<div></div>',
})
export class LogoutComponent implements OnInit {
    public constructor(public  authService: AuthService, public  router: Router) {}

    public ngOnInit() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
