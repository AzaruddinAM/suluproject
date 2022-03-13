import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private apis:ApiService) { }
  datas:Array<{id:string,imageurl:string,name:string,order:number,isactive:number}>=[]
  cols :Array<{field:string,header:string}>= [
    { field: 'main_category_id', header: 'Id' },
    { field: 'image_url', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'arabic_name', header: 'Arabic Name' },
    // { field: 'number', header: 'number' },
    { field: 'order_column', header: 'Order' },
    { field: 'is_active', header: 'Isactive' },
    { field: '', header: '' }
];
api;
data;
  ngOnInit(): void {
  }
  paginate(){
    console.log("paginate");
    
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
}
