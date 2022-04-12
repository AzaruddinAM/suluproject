import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})
export class ViewusersComponent implements OnInit {
  params:any;
  profiledata:any={}
  cols :Array<{field:string,header:string}>= [

    // { field: 'users_id', header: 'User Id' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    // { field: 'user_token', header: 'Arabic Name' },
    { field: 'phone_number', header: 'Phone Number' },
    { field: 'address', header: 'Adress' },
    { field: 'latitude', header: 'Latitude' },
    { field: 'longitude', header: 'Longitude' },
    { field: 'avatar', header: 'Avatar' },
    // { field: 'user_ip', header: 'Arabic Name' },
    // { field: 'image_url', header: 'Image' },
    // { field: 'notification_status', header: 'Isactive' },
    // { field: 'otp', header: 'Id' },
    { field: 'role', header: 'Role' },
    { field: 'gender', header: 'Gender' },
    { field: 'dob', header: 'DOB' },
    // { field: 'otp', header: 'Id' },
    { field: 'is_active', header: 'Is Active' },
    // { field: 'password', header: 'password' },
    { field: 'language', header: 'Language' },
    // { field: '', header: '' }
  ]
  constructor(private router : Router) {
    this.params = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    // alert(JSON.stringify(this.params))
    
    this.profiledata = JSON.parse(this.params.data)
    // alert(this.profiledata.name)
  }

}
