import { AlertifyService } from './../../../_services/alertify.service';
import { UserService } from './../../../_services/User.service';
import { Photo } from './../../../_models/Photo';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getmemberPhotoCahnge = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver=false;
  response:string;
  baseUrl: 'http://localhost:5000/api/';
  currentPhoto: Photo;
  constructor(private authservice: AuthService, private userservice: UserService, private alertify:AlertifyService) {
    
   }

  ngOnInit() {
    this.intializeUploader();
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public SetMainPhoto(photo: Photo){
      return this.userservice.SetMainPhoto(this.authservice.decodedToken.nameid[0], photo.id).subscribe(()=>
      {
        this.currentPhoto=this.photos.filter(p => p.isMain===true)[0];
        this.currentPhoto.isMain=false;
        photo.isMain=true;
        this.getmemberPhotoCahnge.emit(photo.url);
        this.authservice.mainPhoto = photo;
        localStorage.setItem("photo", JSON.stringify(photo));
      }
      , error => {
        this.alertify.error("failed");
      });
  }

  DeletePhoto(Photo: Photo, index: number){
    this.alertify.confirm('Are you sure you want to delete your photo?', () => {
      this.authservice.deletePhoto(Photo.id).subscribe(() => {
        this.photos.splice(index, 1);
        this.alertify.success("photo deleted successfully");
      },error => {
        this.alertify.error('Main Photo Cannot be deleted');
      });
      
    });
      
  }

  intializeUploader(){
    this.uploader=new FileUploader({
      url: 'http://localhost:5000/api/Photos/photo/' + this.authservice.decodedToken.nameid[0],
      authToken: 'Bearer '+ localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onSuccessItem = (item, response, status, headers ) => {
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          description: res.description,
          dateAdded: res.dateAdded,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain){
          this.getmemberPhotoCahnge.emit(photo.url);
          this.authservice.mainPhoto = photo;
          localStorage.setItem("photo", JSON.stringify(photo));
        }
      }
    }
  }

}
