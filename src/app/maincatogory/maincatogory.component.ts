import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-maincatogory',
  templateUrl: './maincatogory.component.html',
  styleUrls: ['./maincatogory.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaincatogoryComponent implements OnInit {
  @ViewChild('dt') table: TableModule;
  cols :Array<{field:string,header:string}>= [
    { field: 'id', header: 'Id' },
    { field: 'imageurl', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'number', header: 'number' },
    { field: 'order', header: 'Order' },
    { field: 'isactive', header: 'Isactive' },
    { field: '', header: '' }
];
  datas=[
  {id:'11',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:1,isactive:true},
  {id:'22',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:2,isactive:true},
  {id:'33',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:3,isactive:true},
  {id:'44',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:4,isactive:true},
  {id:'55',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:5,isactive:true},
  {id:'66',imageurl:'assets/images/maincategory/demo.png',name:'azar5',number:'1431254',order:6,isactive:false},
  {id:'77',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:7,isactive:true},
  {id:'88',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:8,isactive:true},
  {id:'99',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:9,isactive:true},
  {id:'10',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:10,isactive:true},
  {id:'11',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:11,isactive:true},
  {id:'12',imageurl:'assets/images/maincategory/demo.png',name:'azar',number:'1431254',order:12,isactive:true},
  {id:'13',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:13,isactive:true},
  {id:'14',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:14,isactive:true},
  {id:'15',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:15,isactive:true},
  {id:'16',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:16,isactive:true},
]
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {

  }
 
  addnew(){
    // alert("add")
    this.router.navigate(['/addmaincategory'])
  }
  edit(id:string){
    console.log(id);
    // alert(id)
    this.router.navigate(['/addmaincategory'], { state: { id:id}})
    
  }
  deleteone(id:string){
    console.log(id);
    let index=this.datas.findIndex(item=>item.id == id)
    this.datas.splice(index,1)
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
