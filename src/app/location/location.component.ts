import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { FirbaseService } from '../services/firbase.service';
import { ValidationmessagesService } from '../services/validationmessages.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  businessnames:Array<any>=[{name:"business1",business_id:"2"}]
  title = 'ngImageCrop';
    // imageurl:any="assets/images/maincategory/demo.png"
    imageChangedEvent: any = '';
    croppedImage: any = '';
    subcaterories:any =[]
    datas={}
      // {id:'11',imageurl:'https://www.gstatic.com/webp/gallery/1.jpgg',name:'azar',number:'1431254',order:1,isactive:true},
      // {id:'22',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:2,isactive:true},
      // {id:'33',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:3,isactive:true},
      // {id:'44',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:4,isactive:true},
      // {id:'7',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:5,isactive:true},
      // {id:'66',imageurl:'assets/images/maincategory/demo.png',name:'azar5',number:'1431254',order:6,isactive:false}
    
      params: { [k: string]: any; };
      addmaincategory:FormGroup
      sub_category_id: any;
      testfile:string | Blob
      selecetdFile: string;
      notification_validation_message:any={}
      percentage:number=-1
      cropperhide:boolean=false
      progresshow:boolean=false
      addoredit:string='add'
      afterupload
      // @Input() public appFormControl: NgControl;
    constructor(private router : Router,
      private api:ApiService,
      private validationmessagesService:ValidationmessagesService,
      private firebase:FirbaseService) {
      this.params = this.router.getCurrentNavigation().extras.state;
     }
  
    ngOnInit(): void {
      let body='Date='+new Date()
      this.api.Postwithouttoken(environment['Category']+'/get_business_isactive',body)
      .subscribe(item=>{
        this.businessnames = (item.status)?item.data:[]
      })
      this.notification_validation_message = this.validationmessagesService.notification_validation_message;
      // this.params=history.state;
      // this.sub_category_id=this.params.sub_category_id
      // this.datas=JSON.parse(this.params.data)
      
      //   this.addoredit='add'
      //   let sub_category_id=Math.random().toString(36).substr(2, 9);
        this.addmaincategory= new FormGroup({
          name: new FormControl('', [Validators.required]),
          arabic_name: new FormControl('', [Validators.required]),
          latitude: new FormControl('', [Validators.required]),
          longitude: new FormControl('', [Validators.required]),

          // type: new FormControl('0', [Validators.required]),
          // order_column: new FormControl('', [Validators.required]),
          // is_active: new FormControl(true, [Validators.required]),
          // business_name:new FormControl('', [Validators.required]),
          // url:new FormControl('', [Validators.required]),
          // sub_category_id:new FormControl(sub_category_id, [Validators.required])
          // Isactive: ['', Validators.required],
          // Image: ['', Validators.required],
          // subcaterories: this.fb.array(this.subcaterories),
    
        });
        // this.subcaterories.forEach(element => {
        //   this.addmaincategory.addControl(element.name, new FormControl(element.value, Validators.required));
    
        // });
        // https://www.gstatic.com/webp/gallery/1.jpg
    //     this.imageChangedEvent= this.http
    //     .get("https://www.gstatic.com/webp/gallery/1.jpg", {
    //       responseType: 'arraybuffer'
    //    })
    //     .pipe(
    //       map((response:any) => {
    //         return new File([response], "myImage.png");
    //       })
    //     );
        console.log(this.imageChangedEvent);
      
    }
    onSubmit(){
  // this.addmaincategory.get('image_url').setValue(localStorage.getItem('imageurl'))
      console.log("onSubmit");
      console.log(this.addmaincategory.value);
      
      let body = 'data='+JSON.stringify(this.addmaincategory.value)
      // 'name='+this.addmaincategory.get('Name').value+
      // 'image_url='+this.addmaincategory.get('Image').value+
      // 'name='+this.addmaincategory.get('Name').value+
      // +'&date='+Date();
  
      // name, image_url, order_column, is_active
      console.log(body);
      // if(this.sub_category_id == 'new')
      // {
      this.api.Postwithouttoken(environment["Category"] + "/add_location" ,body )
      .subscribe(add_sub_category => {
  
        // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
      console.log(add_sub_category);
      this.addmaincategory.reset()
      // this.router.navigate()
      // this.router.navigate(['/subcategory'])

  
      })
    // }
    // else{
    //   this.api.Postwithouttoken(environment["Category"] + "/edit_sub_category" ,body )
    //   .subscribe(edit_sub_category => {
  
    //     // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    //   console.log(edit_sub_category);
    //   this.router.navigate(['/subcategory'])
    //   })
    // }
      
    }

}
