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
  enquiriescols :Array<{field:string,header:string}> =[
    { field: 'business_enquiries_id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'business_name', header: 'Business Name' },
    { field: 'type', header: 'Type' },
    { field: 'email', header: 'Email' },
    { field: 'phone_number', header: 'Phone Number' },
    { field: 'sub_category', header: 'Sub Category' },
    { field: 'is_active', header: 'Is Active' }
    // { field: 'role', header: 'Role' },
    // { field: 'gender', header: 'Gender' },
    // { field: 'dob', header: 'DOB' },
    // { field: 'language', header: 'Language' },
  ]

  cols :Array<{field:string,header:string}>= [

    // { field: 'user_token', header: 'Arabic Name' },
    // { field: 'users_id', header: 'User Id' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone_number', header: 'Phone Number' },
    { field: 'address', header: 'Adress' },
    { field: 'latitude', header: 'Latitude' },
    { field: 'longitude', header: 'Longitude' },
    { field: 'avatar', header: 'Avatar' },
    { field: 'role', header: 'Role' },
    { field: 'gender', header: 'Gender' },
    { field: 'dob', header: 'DOB' },
    { field: 'is_active', header: 'Is Active' },
    { field: 'language', header: 'Language' },
    // { field: 'user_ip', header: 'Arabic Name' },
    // { field: 'image_url', header: 'Image' },
    // { field: 'notification_status', header: 'Isactive' },
    // { field: 'otp', header: 'Id' },
    // { field: 'otp', header: 'Id' },
    // { field: 'password', header: 'password' },
    // { field: '', header: '' }
  ]
  constructor(private router : Router) {
    this.params = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    // alert(JSON.stringify(this.params))

    this.profiledata = JSON.parse(this.params.data)
    this.cols = this.params.type =='enquiries' ? this.enquiriescols : this.cols
    // alert(this.profiledata.name)
  }

}
