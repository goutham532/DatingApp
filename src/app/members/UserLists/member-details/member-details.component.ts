import { Photo } from './../../../_models/Photo';
import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/User.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { forEach } from '@angular/router/src/utils/collection';
import { of } from 'rxjs';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  
  constructor(private userservice: UserService, private alertify: AlertifyService, private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.loadUser();
    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      }];
      this.galleryImages = [];
      this.route.queryParams.subscribe(params=>{
        const selectedTab: number = params['tab'];
        if(selectedTab>0){
          this.SelectTab(selectedTab);
        }
      })
      
  }

  SelectTab(id:number){
    this.memberTabs.tabs[id].active=true;
  }

  getImages(){
    const imageUrls = [];
    this.user.photos.forEach(
      function(photo: Photo){
        imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
      }
    )
    // for(const photo of this.user.photos){
    //   imageUrls.push({
    //     small: photo.url,
    //     medium: photo.url,
    //     big: photo.url,
    //     description: photo.description
    //   });
    // }
    return imageUrls;
  }

  loadUser(){
    debugger;
      this.userservice.getUser(this.route.snapshot.params['id']).subscribe(
        (user: User) => {
          console.log(user);
          debugger;
          this.user=user;
          this.galleryImages = this.getImages();
          console.log(this.galleryImages);
        },
        error => {
          this.alertify.error(error);
        }
      )
  }

}
