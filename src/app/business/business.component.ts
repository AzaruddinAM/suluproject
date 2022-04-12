import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  @ViewChild('dt') table: TableModule;
  cols :Array<{field:string,header:string}>= [
    { field: 'business_id', header: 'Id' },
    { field: 'name', header: 'Name' },
    // { field: 'arabic_name', header: 'Arabic Name' },
    // { field: 'number', header: 'number' },
    // { field: 'image_url', header: 'Image' },
    // name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description,
    //  address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   
    // web, social_media, timing, service_name, arabic_service_name 
    { field: 'sub_name', header: 'sub_name' },
    // { field: 'arabic_sub_name', header: 'arabic_sub_name' },
    // { field: 'description', header: 'description' },
    // { field: 'arabicdescription', header: 'arabicdescription' },
    // { field: 'address', header: 'address' },
    // { field: 'latitude', header: 'latitude' },
    // { field: 'longitude', header: 'longitude' },
    { field: 'phone_number', header: 'phone_number' },
    // { field: 'alt_phone_number', header: 'alt_phone_number' },
    // { field: 'email', header: 'email' },
    // { field: 'slug', header: 'slug' },
    { field: 'rating', header: 'rating' },
    // { field: 'web', header: 'web' },
    // { field: 'social_media', header: 'social_media' },
    // { field: 'timing', header: 'timing' },
    // { field: 'service_name', header: 'service_Name' },
    // { field: 'arabic_service_name', header: 'arabic_service_name' },
    // { field: 'order_column', header: 'Order' },
    { field: 'is_active', header: 'Isactive' },
    { field: '', header: '' }
];
  datas:Array<{id:string,imageurl:string,name:string,order:number,isactive:number}>=[]
//   {id:'11',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:1,isactive:true},
//   {id:'22',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:2,isactive:true},
//   {id:'33',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:3,isactive:true},
//   {id:'44',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:4,isactive:true},
//   {id:'55',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:5,isactive:true},
//   {id:'66',imageurl:'assets/images/maincategory/demo.png',name:'azar5',number:'1431254',order:6,isactive:false},
//   {id:'77',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:7,isactive:true},
//   {id:'88',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:8,isactive:true},
//   {id:'99',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:9,isactive:true},
//   {id:'10',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:10,isactive:true},
//   {id:'11',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:11,isactive:true},
//   {id:'12',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:12,isactive:true},
//   {id:'13',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:13,isactive:true},
//   {id:'14',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:14,isactive:true},
//   {id:'15',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:15,isactive:true},
//   {id:'16',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:16,isactive:true},
// ]
  constructor(
    private apis : ApiService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    let body = 'data='+'test'+'&date='+Date();
    console.log(body);
    
    this.apis.Postwithouttoken(environment["Category"] + "/get_business" ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

    .subscribe(businessdata => {

      this.datas =(businessdata.status)?  businessdata.data:[]
    console.log(this.datas);
    
    })
  }
 
  addnew(){
    // alert("add")
    this.router.navigate(['/admin/addbusiness'], { state: { business_id:'new' , data:JSON.stringify({})}})
  }
  toggle(event:MatSlideToggleChange,index:number,business_id:number){
    console.log('toggle', event.checked+" index :"+index);
    let body = 'business_id='+business_id+'&is_active='+event.checked+'&date='+Date();
    console.log(body);
    
    this.apis.Postwithouttoken(environment["Category"] + "/active_business" ,body )
    .subscribe(active_business => {

      // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    console.log(active_business);
    
    })
        // this.useDefault = event.checked;
  }
  edit(data){
    console.log(data);
    // alert(id)
    this.router.navigate(['/admin/addbusiness'], { state: { business_id:data.business_id , data:JSON.stringify(data)}})
    
  }
  deleteone(id:string){
    // console.log(id);
    // let index=this.datas.findIndex(item=>item.id == id)
    // this.datas.splice(index,1)
    // let body = 'data='+'test'+'&date='+Date();
    // console.log(body);
    
    // this.apis.Postwithouttoken(environment["Category"] + "/get_business" ,body )
    // .subscribe(maincategorydata => {

    //   this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    // console.log(this.datas);
    
    // })
  }
  viewimage()
  {
console.log(this.datas);

  }
  order(){
    // console.log(this.datas);

    this.datas.map((item,index)=>{ return item.order=index+1})
    // console.log(this.datas);
    
  }

  paginate(){
    console.log("paginate");
    
  }
}
