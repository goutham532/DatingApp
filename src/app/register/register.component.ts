import { User } from './../_models/User';
import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../_services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelReg = new EventEmitter();
  models: any;
  registerForm : FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authservice: AuthService, private alert : AlertifyService, 
    private route: Router, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.registerForm=new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.ConfirmPasswordValidator);
    // console.log(this.registerForm.get('confirmPassword').value);
    this.bsConfig = {
      containerClass : "theme-red"
    }
    this.createFormBuilderValidator();
  }

  ConfirmPasswordValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  createFormBuilderValidator(){
    this.registerForm=this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.ConfirmPasswordValidator});
  }

  Register(){
    this.models = Object.assign({}, this.registerForm.value);
    this.authservice.Register(this.models).subscribe(repsonse=> {
      this.alert.success("Registered Successfully"),
      this.cancelReg.emit("false")
    }, error => {
      this.alert.error(error);
    }, () => {
      this.authservice.login(this.models).subscribe(() => {
        this.router.navigate(['/members'])
      })
    });
  }

  cancel(){
    this.cancelReg.emit("false");
  }

}
