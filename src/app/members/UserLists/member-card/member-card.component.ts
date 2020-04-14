import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/User.service';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() users: User;
  constructor(private authService: AuthService, private userService: UserService
    , private alertify: AlertifyService) { }

  ngOnInit() {
  }

  SendLike(id: number){
    this.userService.SendLike(this.authService.decodedToken.nameid[0],id).subscribe(
      data => {
        this.alertify.success("You have Liked " + this.users.knownAs);
      }, error => {
        this.alertify.error(error);
      }
    );
  }

}
