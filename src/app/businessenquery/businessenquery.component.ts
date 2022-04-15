import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-businessenquery',
  templateUrl: './businessenquery.component.html',
  styleUrls: ['./businessenquery.component.scss']
})
export class BusinessenqueryComponent implements OnInit {

  constructor(private apis:ApiService) { }
  datas=[]
  cols :Array<{field:string,header:string}>= [
    // "name" VARCHAR(100),
		// "business_name" VARCHAR(100),
	  //   "type" VARCHAR(100),
	  //   "email" VARCHAR(100),
	  //   "phone_number" VARCHAR(100),
    //     "is_active" BOOLEAN DEFAULT true,
	  //   "sub_category" VARCHAR(100),
    // { field: 'business_enquiries_id', header: 'Business Enquiries Id' },
    { field: 'name', header: 'Name' },
    { field: 'business_name', header: 'Business Name' },
    // { field: 'type', header: 'Type' },

    { field: 'email', header: 'Email' },
    // { field: 'user_token', header: 'Arabic Name' },
    { field: 'phone_number', header: 'Phone Number' },
    // { field: 'address', header: 'Adress' },
    // { field: 'latitude', header: 'Id' },
    // { field: 'longitude', header: 'Image' },
    // { field: 'avatar', header: 'Avatar' },
    // { field: 'user_ip', header: 'Arabic Name' },
    // { field: 'image_url', header: 'Image' },
    { field: 'sub_category', header: 'Sub Category' },
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
    
    this.apis.Postwithouttoken(environment["Category"] + "/get_business_enqueries" ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

    .subscribe(usersdata => {

      this.datas =(usersdata.status)?  usersdata.data:[]
    console.log(this.datas);
    
    })
  }

  paginate(){
    console.log("paginate");
    
  }

}
