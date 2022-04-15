import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private apis:ApiService,
    private router:Router) { }
  datas=[]
  cols :Array<{field:string,header:string}>= [

    { field: 'users_id', header: 'User Id' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    // { field: 'user_token', header: 'Arabic Name' },
    { field: 'phone_number', header: 'Phone Number' },
    // { field: 'address', header: 'Adress' },
    // { field: 'latitude', header: 'Id' },
    // { field: 'longitude', header: 'Image' },
    // { field: 'avatar', header: 'Avatar' },
    // { field: 'user_ip', header: 'Arabic Name' },
    { field: 'image_url', header: 'Image' },
    // { field: 'notification_status', header: 'Isactive' },
    // { field: 'otp', header: 'Id' },
    // { field: 'role', header: 'Image' },
    // { field: 'gender', header: 'Gender' },
    // { field: 'dob', header: 'DOB' },
    // { field: 'otp', header: 'Id' },
    // { field: 'is_active', header: 'Is Active' },
    // { field: 'password', header: 'password' },
    // { field: 'language', header: 'language' },
    // { field: '', header: '' }

// latitude: "2.333333"
// longitude: "4.333333"
// avatar: null
// user_ip: "weqewqw"
// image_url: null
// notification_status: 0
// otp: 32323
// role: 1
// gender: "male"
// dob: null
// is_active: true
// is_admin: false
// password: null
// language: null
];
api;
data;
  ngOnInit(): void {
    let body = 'data='+'test'+'&date='+Date();
    console.log(body);
    
    this.apis.Postwithouttoken(environment["Category"] + "/get_users" ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

    .subscribe(usersdata => {

      this.datas =(usersdata.status)?  usersdata.data:[]
    console.log(this.datas);
    
    })
  }
  paginate(){
    console.log("paginate");
    
  }
  toggle(event:MatSlideToggleChange,index:number,users_id:number){

    console.log('toggle', event.checked+" index :"+index);
    let body = 'users_id='+users_id+'&is_active='+event.checked+'&date='+Date();
    console.log(body);
    
    this.apis.Postwithouttoken(environment["Category"] + "/active_users" ,body )
    .subscribe(active_users => {
this.datas[index].isactive=event.checked
      // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    console.log(active_users);
    
    })
        // this.useDefault = event.checked;
  }
  viewimage()
  {
console.log(this.datas);

  }
  get(){
    let body = 'data='+this.data+'&date='+Date();
    console.log(body);
    
    this.apis.Postwithouttoken(environment["Mobileapp"] + this.api ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

    .subscribe(maincategorydata => {

      this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    console.log(this.datas);
    
    })
  }
  viewuser(data){
    // alert("add")
    this.router.navigate(['/viewusers'], { state: { users_id:data.users_id , data:JSON.stringify(data)}})
  }
}
