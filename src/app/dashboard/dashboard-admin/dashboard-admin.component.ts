import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../shared/services/excel.service';
import { AppService } from '../../shared/services/app.service';
import { AuthService } from '../../shared/services/auth.service';
import { TeacherService } from '../../shared/services/teachers.service';
declare var jQuery: any;
@Component({
	selector: 'app-dashboard-admin',
	templateUrl: './dashboard-admin.component.html'
})
export class DashboardAdminComponent implements OnInit {

	public i = 0;
    public constructor(public  appService: AppService,public  excelService: ExcelService,
        public  authService: AuthService,
		public  teacherService: TeacherService,public  router : Router,public element: ElementRef) {
	}
    public staffs = [];
	public isEditingProfile = false;
	public editing_name = '';
	public editing_phone = '';
	public editing_mail = '';
	public uploaded_avatar;
	public apiResult;
	public apiResultMessage;

    public newEmail;
    public newFirstName;
    public newLastName;
    public newPhone;

	public onEditProfilePic(event:any){
		var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('#profilePic');

        reader.onload = function(e) {
            var src = e.target['result'];
            image.src = src;
        };
        this.uploaded_avatar = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
	}
	public onEditProfile(){
		this.isEditingProfile = true;
		this.editing_name = this.authService.current_user.first_name + ' ' + this.authService.current_user.last_name;
		this.editing_mail = this.authService.current_user.email;
		this.editing_phone = this.authService.current_user.phone;
	}
	public onCancelEditProfile(){
		var image = this.element.nativeElement.querySelector('#profilePic');
		image.src = this.authService.current_user.avatar;
		this.isEditingProfile = false;
	}
	public onSaveEditProfile(){
		jQuery('#progressModal').modal({backdrop: 'static', keyboard: false});
        if(this.uploaded_avatar != null){
            this.appService.uploadAvatar(this.uploaded_avatar).subscribe(result=>{
                var avatar_link = result['data'].link;
                this.teacherService.updateTeacher(this.authService.current_user.id, this.editing_name, this.editing_mail, this.editing_phone, avatar_link)
                .subscribe(result => {
                    jQuery('#progressModal').modal('hide');
                    this.apiResult = result.result;
                    this.apiResultMessage = result.message;
                    this.appService.showPNotify(this.apiResult,this.apiResultMessage,this.apiResult == 'success' ? 'success' : 'error');
                    if (result.result == 'success') {
                        this.isEditingProfile = false;
                        this.authService.current_user.email = this.editing_mail;
                        this.authService.current_user.phone = this.editing_phone;
                        this.authService.current_user.avatar = avatar_link;
                        this.authService.saveCurrentUserToLocal();
                        var image = this.element.nativeElement.querySelector('#topNavPic');
                        image.src = this.authService.current_user.avatar;
                    }
                }, error => { 
                    jQuery('#progressModal').modal('hide');
                    this.appService.showPNotify('failure', "Server Error! Can't edit profile", 'error');
                });
            },error=>{
                jQuery('#progressModal').modal('hide');
                this.appService.showPNotify('failure', "Error! Can't upload new profile picture", 'error');
            });
        }else{
            this.teacherService.updateTeacher(this.authService.current_user.id, this.editing_name, this.editing_mail, this.editing_phone, null)
            .subscribe(result => {
                jQuery('#progressModal').modal('hide');
                this.apiResult = result.result;
                this.apiResultMessage = result.message;
                this.appService.showPNotify(this.apiResult,this.apiResultMessage,this.apiResult == 'success' ? 'success' : 'error');
                if (result.result == 'success') {
                    this.isEditingProfile = false;
                    this.authService.current_user.email = this.editing_mail;
                    this.authService.current_user.phone = this.editing_phone;
                }
            }, error => { 
                jQuery('#progressModal').modal('hide');
                this.appService.showPNotify('failure', "Server Error! Can't edit profile", 'error');
            });
        }
	}
	public onChangePassword(){
		this.router.navigate(['/change-password']);
	}
	public ngOnInit() {
		this.editing_name = this.authService.current_user.first_name + ' ' + this.authService.current_user.last_name;
		var image = this.element.nativeElement.querySelector('#profilePic');
		image.src = this.authService.current_user.avatar;
		jQuery('#from_to').daterangepicker(null, function(start, end, label) {});

        this.getStaffs();
	}

    public getStaffs(){
        this.appService.getStaffs().subscribe(results => {
            this.staffs = results.staffs;
        }, error => { this.appService.showPNotify('failure',"Server Error! Can't get staff",'error'); });
    }

	public keyDownFunction(event) {
      if(event.keyCode == 13) {
        this.onSaveEditProfile();
      }
    }

    public onAddStaff(){
        jQuery('#addStaffModal').modal('show');    
    }


    public addStaff(){
        this.appService.addStaff(this.newEmail, this.newPhone, this.newFirstName, this.newLastName)
            .subscribe(result => {
                jQuery('#addStaffModal').modal('hide');
                this.apiResult = result.result;
                this.apiResultMessage = result.message;
                this.appService.showPNotify(this.apiResult,this.apiResultMessage,this.apiResult == 'success' ? 'success' : 'error');
                if (result.result == 'success') {
                    this.newEmail = '';
                    this.newPhone = '';
                    this.newFirstName = '';
                    this.newLastName = '';

                    this.getStaffs();
                }
            }, error => {
                this.appService.showPNotify('failure', "Server Error! Can't add staff", 'error');
            });
    }

    public onCancelAddStaff(){
        jQuery('#addStaffModal').modal('hide');
    }

    public onRemoveStaff(email){
        this.appService.removeStaff(email)
            .subscribe(result => {
                this.apiResult = result.result;
                this.apiResultMessage = result.message;
                this.appService.showPNotify(this.apiResult,this.apiResultMessage,this.apiResult == 'success' ? 'success' : 'error');
                if (result.result == 'success') {
                    this.getStaffs();
                }
            }, error => {
                this.appService.showPNotify('failure', "Server Error! Can't add staff", 'error');
            });
    }
}

