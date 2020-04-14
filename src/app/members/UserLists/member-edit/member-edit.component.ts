
import { Router, RouterModule } from '@angular/router';
import { UserService } from './../../../_services/User.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { NgForm } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  // @HostListener('windows:beforeunload', ['$event'])
  // beforeUnloadHander($event: any){
  //   if(this.editForm.dirty){
  //     alert("dont go!!");
  //   }
  // }
  constructor(private authService: AuthService, private alertify: AlertifyService, 
    private userservice: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUser();
    delay(1000);
    // while(this.user==undefined){
    //   console.log(this.user);
    // }
  }

  loadUser(){
    console.log(this.authService.decodedToken.nameid[0]);
    this.userservice.getUser(this.authService.decodedToken.nameid[0]).subscribe(
      (user: User) => {
        this.user=user;
      },
      error => {
        this.alertify.error(error);
      }
    )
  }

  UpdateMainPhoto(photoUrl: string){
    this.user.photoUrl=photoUrl;
  }

  updateUser(){
    console.log(this.user);
    this.userservice.updateUser(this.user).subscribe(
      next => {
        this.alertify.success('profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      }
    );
    
  }

}
