import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  values:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode=true;
  }

  registerToggleFalse(){
    this.registerMode=false;
  }

  

  cancelRegisterMode(Mode: boolean){
    this.registerMode=false;
  }

}
