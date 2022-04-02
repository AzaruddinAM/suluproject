import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm : FormGroup;
  error :string = ""
  constructor(private Router : Router,
    private fb: FormBuilder,
    private api:ApiService
    ) { }

  ngOnInit() {

    this.LoginForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
      ])),
    })
  }
  signIn(){
    // if(this.LoginForm.get('username').value == "admin*" && this.LoginForm.get('password').value=="admin*"){
      // this.Router.navigate(['/dashboard'])
      
    // }
    // else{
    //   this.error="Incurrect username or password "
    //   setTimeout(() => {
    //     this.error=""
    //   }, 2000);
    // }
let body='username='+this.LoginForm.get('username').value+'&password='+this.LoginForm.get('password').value
this.api.Postwithouttoken(environment['Category']+'/login_check',body)
.subscribe(
  check=>{
    let status=(check.status)?'success':'failed'
    if(status=='success'){
      this.Router.navigate(['/dashboard'])
    }
       else{
      this.error="Incurrect username or password "
      setTimeout(() => {
        this.error=""
      }, 2000);
    }
  }
)
  }
}
