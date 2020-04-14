import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {};

  constructor(public authservice: AuthService, private alert : AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  Login(){
    this.authservice.login(this.model).subscribe(next=> {
      this.alert.success("logged in successfully");
    }, error => {
      this.alert.error(error)
    }, () => {
      this.router.navigate(['\members']);
    });
  }

  loggedin(){
    return this.authservice.loggedin();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('mainPhoto');
    this.authservice.decodedToken=null;
    this.authservice.mainPhoto=null;
    this.alert.message('logged out');
    this.router.navigate(['\home']);
  }

}
