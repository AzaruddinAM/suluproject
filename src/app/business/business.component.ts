import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  @ViewChild('dt') table: TableModule;
  cols :Array<{field:string,header:string}>= [
    { field: 'id', header: 'Id' },
    { field: 'imageurl', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'number', header: 'number' },
    { field: 'order', header: 'Order' },
    { field: 'isactive', header: 'Isactive' }
];
  datas=[
  {id:'11',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:1,isactive:true},
  {id:'22',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:2,isactive:true},
  {id:'33',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:3,isactive:true},
  {id:'44',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:4,isactive:true},
  {id:'55',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:5,isactive:true},
  {id:'66',imageurl:'assets/images/maincategory/demo.png',name:'azar5',number:'1431254',order:6,isactive:false}
]
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {

  }
 
  addnew(){
    // alert("add")
    this.router.navigate(['/addbusiness'])
  }
}
