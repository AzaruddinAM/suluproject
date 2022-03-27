import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ValidationmessagesService } from '../services/validationmessages.service';
import { FirbaseService } from '../services/firbase.service';

@Component({
  selector: 'app-addbusiness',
  templateUrl: './addbusiness.component.html',
  styleUrls: ['./addbusiness.component.scss']
})
export class AddbusinessComponent implements OnInit {

  
    title = 'ngImageCrop';
    imageurl:any="assets/images/maincategory/demo.png"
    imageChangedEvent: any = '';
    croppedImage: any ;
    subcaterories:any =[]
    images:any =[]
    // [{url:"assets/images/maincategory/demo.png",type:'2'},{url:"assets/images/maincategory/demo.png",type:'2'},{url:"assets/images/maincategory/demo.png",type:'2'},{url:"assets/images/maincategory/demo.png",type:'2'}]
    type1images:any=[]
    // [{name:'sub1',value:true},{name:'sub2',value:true},{name:'sub3',value:false},{name:'sub4',value:true},]
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
      fbs;
      downloadURL: Observable<string>;
      percentage:number=-1
      cropperhide:boolean=false
      progresshow:boolean=false
      // @Input() public appFormControl: NgControl;
    constructor(private router : Router,
      private fb : FormBuilder,
      private http:HttpClient,
      private api:ApiService,
      private validationmessagesService:ValidationmessagesService,
      private firebase: FirbaseService) {
      this.params = this.router.getCurrentNavigation().extras.state;
      this.addmaincategory= this.fb.group({
        name: new FormControl('ajju1', [Validators.required]),
      arabic_name: new FormControl('ajjuarabic1', [Validators.required]),
      is_active: new FormControl(true, [Validators.required]),
      sub_name: new FormControl('sub_name1', [Validators.required]),
      arabic_sub_name: new FormControl('arabic_sub1', [Validators.required]),
      discription: new FormControl('discription', [Validators.required]),
      arabic_description: new FormControl('arabic_description', [Validators.required]),
      address: new FormControl('address', [Validators.required]),
      mapingname: new FormControl('mapingname', [Validators.required]),
      arabic_mapingname: new FormControl('arabic_mapingname', [Validators.required]),
      latitude: new FormControl(46545.56, [Validators.required]),
      longitude: new FormControl(45665.66, [Validators.required]),
      phone_number: new FormControl('12345678', [Validators.required]),
      alt_phone_number: new FormControl('3456789', [Validators.required]),
      email: new FormControl('dfchgv@hgdf.dsds', [Validators.required]),
      slug: new FormControl('slug', [Validators.required]),
      rating: new FormControl('rating', [Validators.required]),
      web: new FormControl('web', [Validators.required]),
      social_media: new FormControl('social', [Validators.required]),
      timing: new FormControl('timing', [Validators.required]),
      service_name: new FormControl({s1:"",data:['s1','s2']}, [Validators.required]),
      arabic_service_name: new FormControl({sa1:"",data:['sa1','sa2']}, [Validators.required]),
      imagetype: new FormControl()

      })
     }
  
    ngOnInit(): void {
      this.business_validation_message = this.validationmessagesService.Business_Validation_Message;
      this.params=history.state;
      this.business_id=this.params.business_id
      this.datas=JSON.parse(this.params.data)
      let body = 'date='+Date();
      this.api.Postwithouttoken(environment["Category"] + "/get_sub_category_list" ,body )
      .subscribe(sub_category => {
        // this.subcaterories= sub_category.data
        this.subcaterories = (sub_category.status) ? sub_category.data:[]
        this.subcaterories =this.subcaterories.map(({ name, sub_category_id ,value }) => ({name, sub_category_id ,value}))
        console.log(this.subcaterories);
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
        imagetype: new FormControl(this.datas['imagetype'], [Validators.required])

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
       
  
          // business_id:new FormControl(business_id, [Validators.required])
          // Isactive: ['', Validators.required],
          // Image: ['', Validators.required],
          // subcaterories: this.fb.array(this.subcaterories),
    
        // });
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
    })
    }
    onSubmit(){
      // console.log("onSubmit");
      console.log("onSubmit");
      console.log(this.addmaincategory.value);
      console.log(this.subcaterories);
      let body 
      this.subcaterories = this.subcaterories.filter(item=>item.value==true)
      if(this.addmaincategory.get('imagetype').value=='1')
      {
        this.type1images =this.type1images.map(({ business_image_id, url ,type }) => ({business_image_id, url ,type}))
      body = 'data='+JSON.stringify(this.addmaincategory.value)+'&sub_categories_id='+JSON.stringify(this.subcaterories)+'&images='+JSON.stringify(this.type1images)+'&date='+Date();
      
    }
      else if(this.addmaincategory.get('imagetype').value=='2'){
        this.images =this.images.map(({ business_image_id, url ,type }) => ({business_image_id, url ,type}))
      body = 'data='+JSON.stringify(this.addmaincategory.value)+'&sub_categories_id='+JSON.stringify(this.subcaterories)+'&images='+JSON.stringify(this.images)+'&date='+Date();
      
      }
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
      this.router.navigate(['/business'])
  
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
      this.imageChangedEvent = event;
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      
  }
  uploadtofirebase(){
        let business_image_id =Math.random().toString(36).substr(2, 9);

    localStorage.removeItem("image_url");
    this.progresshow=true
    const filePath = `business/type1/`;
    let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value+'_'+business_image_id:business_image_id
    this.firebase.uploadfile(this.croppedImage,filePath,imagename)
    .subscribe(
      percentage => {
        this.percentage = Math.round(percentage ? percentage : 0);
        console.log(this.percentage);
        if(this.percentage==100){
          this.cropperhide=true
          this.progresshow=false
    // this.addmaincategory.get('image_url')
  console.log(localStorage.getItem('imageurl'));
  // this.addmaincategory.get('image_url').setValue(localStorage.getItem('imageurl'))

  this.type1images=[{business_image_id:business_image_id,url:localStorage.getItem('imageurl'),showurl:decodeURIComponent(localStorage.getItem('imageurl')),type:this.addmaincategory.get('imagetype').value}]
  
        }
        
      },
      error => {
        console.log(error);
      }
    )
    // .subscribe(data=>{
  
    // }
    // )
    // console.log(imageurl);
    
    // this.addmaincategory.get('image_url').setValue(this.firebase.uploadfile(this.croppedImage,filePath,'azar'))
    console.log(this.addmaincategory.get('image_url').value);
    
  }
  multipleuploadtofirebase(){
    let business_image_id =Math.random().toString(36).substr(2, 9);

    localStorage.removeItem("image_url");
    this.progresshow=true
    const filePath = `business/type2/`;
    let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value+'_'+business_image_id:business_image_id
    this.firebase.uploadfile(this.croppedImage,filePath,imagename)
    .subscribe(
      percentage => {
        this.percentage = Math.round(percentage ? percentage : 0);
        console.log(this.percentage);
        if(this.percentage==100){
          this.cropperhide=true
          this.progresshow=false
    // this.addmaincategory.get('image_url')
  console.log(localStorage.getItem('imageurl'));
  // this.addmaincategory.get('image_url').setValue(localStorage.getItem('imageurl'))

  this.images.push({business_image_id:business_image_id,url:localStorage.getItem('imageurl'),showurl:decodeURIComponent(localStorage.getItem('imageurl')),type:this.addmaincategory.get('imagetype').value})
  
        }
        
      },
      error => {
        console.log(error);
      }
    )
    // .subscribe(data=>{
  
    // }
    // )
    // console.log(imageurl);
    
    // this.addmaincategory.get('image_url').setValue(this.firebase.uploadfile(this.croppedImage,filePath,'azar'))
    // console.log(this.addmaincategory.get('image_url').value);
    
  }
  imageCropped(event:ImageCroppedEvent) {
  
      // console.log(event);
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      this.croppedImage = event.base64;
  //     console.log(event);
  //     this.croppedImage = event.base64
  //     const base64 = '...';
  //     const imageName = 'name.png';
  //     const imageBlob = this.dataURItoBlob(event.base64)
  //     const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
  //     this.testfile=imageFile
  //     var formData = new FormData();
  //     formData.append("file", this.testfile);
  //     this.imageChangedEvent = event;
  //     var name = document.getElementById('browseAttachment'); 
  
  //     var nameType = name['files'].item(0).type;
  //     console.log(nameType);
  //     console.log(formData);
      
  //     this.http.post(environment['File'], formData)
  // .subscribe((response)=>{
  //   console.log('response receved is ', response);
  //   if(response['status'] == 'success'){
  //   this.selecetdFile =response['serverpath']+encodeURI(imageName)//event.target.files[0].name)
  //   //  environment['App.withoutToken']+'?filename='+encodeURI(event.target.files[0].name)
  //   console.log(this.selecetdFile);
  //   // http://localhost/multerimages/msgwrong4.png
  //   // this.sendMsg(id,this.selecetdFile,'IMAGE',event.target.files[0].name,nameType);
  //   }
  //   else{
  //     console.log("error");
      
  //     // this._snackBar.open('File not uploaded','Upload error',this.config)
  //   }
  // })
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

changesubcategory(index,value){
  this.subcaterories[index].value=value
}
cropperHide(){
  this.cropperhide=false
}
  
}
