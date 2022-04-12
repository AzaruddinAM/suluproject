import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  loginobserve :Observable<any>;
  constructor(private Router : Router,
    private fb: FormBuilder,
    private api:ApiService
    ) { }

  ngOnInit() {
    if(this.api.loginverify())
    {
      this.Router.navigate(['/admin/dashboard'])

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
  }
  Login(){
    if(this.LoginForm.valid){
      this.loginobserve=this.api.login(environment['Category']+'/login_check',this.LoginForm.value)
      this.loginobserve.subscribe(loginsuccess=>{
        if(loginsuccess.status){
          console.log(loginsuccess.token);
          localStorage.setItem('token',loginsuccess.token)
          this.Router.navigate(['/admin/dashboard'])
        }
        else{
          console.log("not success");
          
        }
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
      this.Router.navigate(['/admin/dashboard'])
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
