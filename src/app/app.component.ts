import { Photo } from './_models/Photo';
import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating-SPA';
  JwtHelper = new JwtHelperService();
  constructor(private authService : AuthService){

  }
  ngOnInit(){
    const token = localStorage.getItem('token');
    const MainPhoto: Photo = JSON.parse(localStorage.getItem('photo'));
    if(token){
      this.authService.decodedToken= this.JwtHelper.decodeToken(localStorage.getItem('token'));
    }
    if(MainPhoto){
    this.authService.mainPhoto = MainPhoto;
    this.authService.mainPhoto.url = MainPhoto.url;}
  }
}
