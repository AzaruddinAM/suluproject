import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ValidationmessagesService } from '../services/validationmessages.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm : FormGroup;
  LoginForm2 : FormGroup;
  error :string = ""
  loginobserve :Observable<any>;
  login:boolean=true
  loginvalidatemsg=this.validationmessagesService.Login_Validation_Message
  constructor(private Router : Router,
    private fb: FormBuilder,
    private api:ApiService,
    private validationmessagesService:ValidationmessagesService
    ) { }

  ngOnInit() {
    if(this.api.loginverify())
    {
      this.Router.navigate(['/dashboard'])

    }
    // localStorage.clear()
    this.LoginForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
      ])),
    })
    this.LoginForm2 = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      new_password: new FormControl('',Validators.compose([
        Validators.required,
      ])),
    })
  }
  Login(){
    if(this.LoginForm.valid){
      this.loginobserve=this.api.login(environment['Category']+'/login_check',this.LoginForm.value)
      this.loginobserve.subscribe(loginsuccess=>{
        if(loginsuccess.status){
          console.log(loginsuccess.token);
          this.error="SignIn successfull";

          localStorage.setItem('token',loginsuccess.token)
          this.Router.navigate(['/dashboard'])
        }
        else{
          this.error="user name or password is incorrect";
          console.log("not success");
          
        }
        setTimeout(() => {
          this.error=""
        }, 3000);
      },
      err=>{
        console.log("some error");
        console.error(err);
        
        
      }
      )
    }
  }
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
  }
forgetPassword(){
  if(this.LoginForm2.valid){
    this.loginobserve=this.api.login(environment['Category']+'/change_password',this.LoginForm2.value)
      this.loginobserve.subscribe(loginsuccess=>{
        if(loginsuccess.status){
          // console.log(loginsuccess.token);
          // localStorage.setItem('token',loginsuccess.token)
          // this.Router.navigate(['/dashboard'])
          this.error="Password changed successfully";
          this.login=true
          
        }
        else{
          console.log("not success");
          this.error="Password not changed";

          
        }
        setTimeout(() => {
          this.error=""
        }, 3000);
      },
      err=>{
        console.log("some error");
        console.error(err);
        
        
      }
      )
    }
  

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
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.loginobserve.unsubscribe()
  }
}
