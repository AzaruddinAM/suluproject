import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ValidationmessagesService } from '../services/validationmessages.service';

@Component({
  selector: 'app-addbusiness',
  templateUrl: './addbusiness.component.html',
  styleUrls: ['./addbusiness.component.scss']
})
export class AddbusinessComponent implements OnInit {

  
    title = 'ngImageCrop';
    imageurl:any="assets/images/maincategory/demo.png"
    imageChangedEvent: any = '';
    croppedImage: any = 'assets/images/maincategory/demo.png';
    subcaterories:any =[{name:'sub1',value:true},{name:'sub2',value:true},{name:'sub3',value:false},{name:'sub4',value:true},]
    datas={}
      // {id:'11',imageurl:'https://www.gstatic.com/webp/gallery/1.jpgg',name:'azar',number:'1431254',order:1,isactive:true},
      // {id:'22',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:2,isactive:true},
      // {id:'33',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:3,isactive:true},
      // {id:'44',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:4,isactive:true},
      // {id:'7',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:5,isactive:true},
      // {id:'66',imageurl:'assets/images/maincategory/demo.png',name:'azar5',number:'1431254',order:6,isactive:false}
    
      params: { [k: string]: any; };
      addmaincategory:FormGroup
      business_id: any;
      testfile:string | Blob
      selecetdFile: string;
      business_validation_message:any={}
      // @Input() public appFormControl: NgControl;
    constructor(private router : Router,
    //   private fb : FormBuilder,
      private http:HttpClient,
      private api:ApiService,
      private validationmessagesService:ValidationmessagesService) {
      this.params = this.router.getCurrentNavigation().extras.state;
     }
  
    ngOnInit(): void {
      this.business_validation_message = this.validationmessagesService.Business_Validation_Message;
      this.params=history.state;
      this.business_id=this.params.business_id
      this.datas=JSON.parse(this.params.data)
      if(this.business_id !=='new')
      {
      // alert(JSON.stringify(this.params))
      // let index = this.datas.findIndex(item=>item.id==this.id)
      
      this.addmaincategory= new FormGroup({
        // name , image_url , order_column ,  is_active , id 
        name: new FormControl(this.datas['name'], [Validators.required]),
        arabic_name: new FormControl(this.datas['arabic_name'], [Validators.required]),
        is_active: new FormControl(this.datas['is_active'], [Validators.required]),
        sub_name: new FormControl(this.datas['sub_name'], [Validators.required]),
        arabic_sub_name: new FormControl(this.datas['arabic_sub_name'], [Validators.required]),
        discription: new FormControl(this.datas['discription'], [Validators.required]),
        arabic_description: new FormControl(this.datas['arabic_description'], [Validators.required]),
        address: new FormControl(this.datas['address'], [Validators.required]),
        latitude: new FormControl(this.datas['latitude'], [Validators.required]),
        longitude: new FormControl(this.datas['longitude'], [Validators.required]),
        phone_number: new FormControl(this.datas['phone_number'], [Validators.required]),
        alt_phone_number: new FormControl(this.datas['alt_phone_number'], [Validators.required]),
        email: new FormControl(this.datas['email'], [Validators.required]),
        slug: new FormControl(this.datas['slug'], [Validators.required]),
        rating: new FormControl(this.datas['rating'], [Validators.required]),
        web: new FormControl(this.datas['web'], [Validators.required]),
        social_media: new FormControl(this.datas['social_media'], [Validators.required]),
        timing: new FormControl(this.datas['timing'], [Validators.required]),
        service_name: new FormControl(this.datas['service_name'], [Validators.required]),
        arabic_service_name: new FormControl(this.datas['arabic_service_name'], [Validators.required]),


        // image_url: new FormControl(this.datas['image_url'], [Validators.required]),
        // order_column: new FormControl(this.datas['order_column'], [Validators.required]),
  
        // business_id:new FormControl(this.business_id, [Validators.required])
        // Isactive: ['', Validators.required],
        // Image: ['', Validators.required],
        // subcaterories: this.fb.array(this.subcaterories),
        // name, arabic_name, is_active, sub_name, arabic_sub_name,description,arabic_description,
        //  address, latitude, longitude, phone_number ,alt_phone_number, email, slug, rating,   
        // web, social_media, timing, service_name, arabic_service_name
  
      });
      // this.subcaterories.forEach(element => {
      //   this.addmaincategory.addControl(element.name, new FormControl(element.value, Validators.required));
  
      // });
      // https://www.gstatic.com/webp/gallery/1.jpg
    //   this.imageChangedEvent= this.http
    //   .get("https://www.gstatic.com/webp/gallery/1.jpg", {
    //     responseType: 'arraybuffer'
    //  })
    //   .pipe(
    //     map((response:any) => {
    //       return new File([response], "myImage.png");
    //     })
    //   );
      console.log(this.imageChangedEvent);
      }
      else{
        let business_id=Math.random().toString(36).substr(2, 9);
        this.addmaincategory= new FormGroup({
          name: new FormControl('', [Validators.required]),
        arabic_name: new FormControl('', [Validators.required]),
        is_active: new FormControl('', [Validators.required]),
        sub_name: new FormControl('', [Validators.required]),
        arabic_sub_name: new FormControl('', [Validators.required]),
        discription: new FormControl('', [Validators.required]),
        arabic_description: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        latitude: new FormControl('', [Validators.required]),
        longitude: new FormControl('', [Validators.required]),
        phone_number: new FormControl('', [Validators.required]),
        alt_phone_number: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        slug: new FormControl('', [Validators.required]),
        rating: new FormControl('', [Validators.required]),
        web: new FormControl('', [Validators.required]),
        social_media: new FormControl('', [Validators.required]),
        timing: new FormControl('', [Validators.required]),
        service_name: new FormControl('', [Validators.required]),
        arabic_service_name: new FormControl('', [Validators.required]),
  
          // business_id:new FormControl(business_id, [Validators.required])
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
    }
    onSubmit(){
      console.log("onSubmit");
      console.log(this.addmaincategory.value);
      
      let body = 'data='+JSON.stringify(this.addmaincategory.value)
      // 'name='+this.addmaincategory.get('Name').value+
      // 'image_url='+this.addmaincategory.get('Image').value+
      // 'name='+this.addmaincategory.get('Name').value+
      // +'&date='+Date();
  
      // name, image_url, order_column, is_active
      console.log(body);
      if(this.business_id == 'new')
      {
      this.api.Postwithouttoken(environment["Category"] + "/add_business" ,body )
      .subscribe(add_business => {
  
        // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
      console.log(add_business);
      // this.router.navigate()
      this.router.navigate(['/maincatogory'])
  
      })
    }
    else{
      this.api.Postwithouttoken(environment["Category"] + "/edit_business" ,body )
      .subscribe(edit_business => {
  
        // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
      console.log(edit_business);
      this.router.navigate(['/maincatogory'])
      })
    }
      
    }
    fileChangeEvent(event: any): void {
      // this.imageChangedEvent = event;
      this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      
  }
  imageCropped(event:ImageCroppedEvent) {
  
      // console.log(event);
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      // this.croppedImage = event.base64;
      console.log(event);
      this.croppedImage = event.base64
      const base64 = '...';
      const imageName = 'name.png';
      const imageBlob = this.dataURItoBlob(event.base64)
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      this.testfile=imageFile
      var formData = new FormData();
      formData.append("file", this.testfile);
      this.imageChangedEvent = event;
      var name = document.getElementById('browseAttachment'); 
  
      var nameType = name['files'].item(0).type;
      console.log(nameType);
      console.log(formData);
      
      this.http.post(environment['File'], formData)
  .subscribe((response)=>{
    console.log('response receved is ', response);
    if(response['status'] == 'success'){
    this.selecetdFile =response['serverpath']+encodeURI(imageName)//event.target.files[0].name)
    //  environment['App.withoutToken']+'?filename='+encodeURI(event.target.files[0].name)
    console.log(this.selecetdFile);
    // http://localhost/multerimages/msgwrong4.png
    // this.sendMsg(id,this.selecetdFile,'IMAGE',event.target.files[0].name,nameType);
    }
    else{
      console.log("error");
      
      // this._snackBar.open('File not uploaded','Upload error',this.config)
    }
  })
  }
  imageLoaded() {
      // alert("1")
      /* show cropper */
  }
  cropperReady() {
      // alert("2")
  
      /* cropper ready */
  }
  loadImageFailed() {
      // alert("3")
  
      /* show message */
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
  }
}
