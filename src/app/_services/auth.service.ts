import { User } from './../_models/User';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Photo } from '../_models/Photo';
import { BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl= environment.apiUrl + 'auth/';
  jwtHelper= new JwtHelperService();
  decodedToken : any;
  mainPhoto: Photo;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
constructor( private http:HttpClient) { 

}
login(models : any){
  var modelsObject = JSON.stringify(models);
  console.log(modelsObject);
  return this.http.post(this.baseUrl + 'Login/' + models.username +  "/" 
  + models.password + "/", "")
  .pipe(
    map( (response: any ) => {
      const user = response;
      if(user){
        localStorage.setItem("token", user.token);
        localStorage.setItem("photo", JSON.stringify(user.mainPhoto));
        localStorage.setItem("user", JSON.stringify(user.userLoggedIn));
        this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        this.mainPhoto = user.mainPhoto;
        this.photoUrl=user.mainPhoto.url;
      }
    }
  ));
}

Register(user : any){
  const date = new Date(user.dateOfBirth);
  const month = date.getMonth() + 1;
  const datestring = month + '-' + date.getDate() + '-' + date.getFullYear();
  return this.http.post(this.baseUrl + 'Register/' + user.username +  "/" 
  + user.password + "/" + user.gender +  "/" 
  + user.knownAs + "/" + datestring +  "/" 
  + user.city + "/" + user.country, "");
}

loggedin(){
  var token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

deletePhoto(PhotoId : number){
  const UserId = this.decodedToken.nameid[0];
  return this.http.delete('http://localhost:5000/api/Photos/DeletePhoto/' + this.decodedToken.nameid[0] +  "/" 
  + PhotoId + "/");
}

}
