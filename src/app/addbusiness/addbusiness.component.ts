import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ValidationmessagesService } from '../services/validationmessages.service';
import { FirbaseService } from '../services/firbase.service';
import { tap,finalize, map, catchError } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-addbusiness',
  templateUrl: './addbusiness.component.html',
  styleUrls: ['./addbusiness.component.scss']
})
export class AddbusinessComponent implements OnInit {

  
    title = 'ngImageCrop';
    // imageurl:any="assets/images/maincategory/demo.png"
    arabic_service_name = new FormControl();
    service_name = new FormControl();

    imageChangedEvent: any = '';
    croppedImage: any ;
    subcaterories:any =[]
    galleryimages:any =[]
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
      addoredit='add'
  error: string;
  locations:any=[]
  arabic_service_name_options:any=[]
  service_name_options:any=[]
      // @Input() public appFormControl: NgControl;
    constructor(private router : Router,
      private fb : FormBuilder,
      private http:HttpClient,
      private api:ApiService,
      private validationmessagesService:ValidationmessagesService,
      private firebase: FirbaseService,
      private storage:AngularFireStorage,) {
      this.params = this.router.getCurrentNavigation().extras.state;
      this.addmaincategory= this.fb.group({
      name: new FormControl('', [Validators.required]),
      arabic_name: new FormControl('', [Validators.required]),
      is_active: new FormControl(true, [Validators.required]),
      sub_name: new FormControl('', [Validators.required]),
      arabic_sub_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      arabic_description: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      arabic_address: new FormControl('', [Validators.required]),
      mapingname: new FormControl('', [Validators.required]),
      // arabic_mapingname: new FormControl('arabic_mapingname', [Validators.required]),
      latitude: new FormControl(0.00, [Validators.required]),
      longitude: new FormControl(0.00, [Validators.required]),
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
      imagetype: new FormControl('1', [Validators.required]),

      })
     }
  
    ngOnInit(): void {
      this.business_validation_message = this.validationmessagesService.Business_Validation_Message;
      this.params=history.state;
      this.business_id=this.params.business_id
      console.log(this.params.data);
      
      this.datas=JSON.parse(this.params.data)
      var  body = 'date='+Date()+'&business_id='+this.business_id;
      // this.api.Postwithouttoken(environment["Category"] + "/get_sub_category_list" ,body )
      var api
    if(this.business_id ==='new')
      api=this.api.Postwithouttoken(environment["Category"] + "/get_sub_category_list_location" ,body )
    else
     api=this.api.Postwithouttoken(environment["Category"] + "/get_sub_category_list_in_business_locations" ,body )
      api.subscribe(sub_category => {
        // this.subcaterories= sub_category.data
        this.subcaterories = (sub_category.status) ? sub_category.sub_category_data:[]
        this.locations = (sub_category.status) ? sub_category.location_data:[]
        this.subcaterories =this.subcaterories.map(({ name, sub_category_id ,value }) => ({name, sub_category_id ,value}))
        console.log(this.subcaterories);
      if(this.business_id !=='new')
      {
      this.addoredit='edit'
      this.addmaincategory= new FormGroup({
        name: new FormControl(this.datas['name'], [Validators.required]),
        arabic_name: new FormControl(this.datas['arabic_name'], [Validators.required]),
        is_active: new FormControl(this.datas['is_active'], [Validators.required]),
        sub_name: new FormControl(this.datas['sub_name'], [Validators.required]),
        arabic_sub_name: new FormControl(this.datas['arabic_sub_name'], [Validators.required]),
        description: new FormControl(this.datas['description'], [Validators.required]),
        arabic_description: new FormControl(this.datas['arabic_description'], [Validators.required]),
        address: new FormControl(this.datas['address'], [Validators.required]),
        arabic_address: new FormControl(this.datas['arabic_address'], [Validators.required]),
        mapingname: new FormControl('', [Validators.required]),
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
        imagetype: new FormControl('1', [Validators.required])
      });
      let api2
        api2=this.api.Postwithouttoken(environment['Category']+'/get_businessimages_location',body)
        // .pipe(map((data: any) => data.result ), 
        //           catchError(error => { return throwError('Its a Trap!')})
        //     )

        api2.subscribe(
          items=>{
            console.log(items);
            
            if(items.status){
              var images=JSON.parse(items.images)
              if(images.length>0)
              {
              images.forEach(element => {
                let json={}
                json['business_image_id']=element.business_image_id
                json['url']=encodeURIComponent(element.image_url)
                json['showurl']=element.image_url
                json['type']=element.type
                if(element.type=='1')
                  this.type1images.push(json)
                else if(element.type=='2')
                  this.images.push(json)
                else if(element.type=='3')
                  this.galleryimages.push(json)
              });
              this.cropperhide=true
            }
            var locations =JSON.parse(items.locations)
            if(locations.length>0)
              {
              // locations.forEach(element => {
                this.addmaincategory.get('mapingname').setValue(locations[0].name)
                // this.addmaincategory.get('arabic_mapingname').setValue(element.arabic_name)
                // this.addmaincategory.get('latitude').setValue(element.latitude)
                // this.addmaincategory.get('longitude').setValue(element.longitude)

                // mapingname= new FormControl('mapingname', [Validators.required]),
                // arabic_mapingname: new FormControl('arabic_mapingname', [Validators.required]),
                // latitude: new FormControl(46545.56, [Validators.required]),
                // longitude: new FormControl(45665.66, [Validators.required]),
              // });
            }
            }
            else{
              console.log("reponse error");
              
            }
          }
        )

        
      // alert(JSON.stringify(this.params))
      // let index = this.datas.findIndex(item=>item.id==this.id)
      // let body2='business_id='+
   
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
      // console.log(this.imageChangedEvent);
      }
      else{
      this.addoredit='add'

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
      if(this.type1images.length>0)
      {
      console.log("onSubmit");
      console.log(this.addmaincategory.value);
      console.log(this.subcaterories);
      let body 
      this.subcaterories = this.subcaterories.filter(item=>item.value==true)
      var images=[]
      images = [...this.type1images,...this.images,...this.galleryimages]
      images=images.map(({ business_image_id, url ,type }) => ({business_image_id, url ,type}))
      // console.log(this.locations);
      // console.log(this.addmaincategory.get('mapingname').value);
      
      var index=this.locations.findIndex(item=>item.name==this.addmaincategory.get('mapingname').value)
      
    //   if(this.addmaincategory.get('imagetype').value=='1')
    //   {
    //     this.type1images =this.type1images.map(({ business_image_id, url ,type }) => ({business_image_id, url ,type}))
    //   body = 'data='+JSON.stringify(this.addmaincategory.value)+'&sub_categories_id='+JSON.stringify(this.subcaterories)+'&images='+JSON.stringify(this.type1images)+'&date='+Date();
      
    // }
    //   else if(this.addmaincategory.get('imagetype').value=='2'){
    //     this.images =this.images.map(({ business_image_id, url ,type }) => ({business_image_id, url ,type}))
    // +'&service_name='+JSON.stringify(this.service_name_options)+'&arabic_service_name='+JSON.stringify(this.arabic_service_name_options)
      body = 'data='+JSON.stringify(this.addmaincategory.value)+'&sub_categories_id='+JSON.stringify(this.subcaterories)+'&images='+JSON.stringify(images)+'&location_id='+this.locations[index].location_id+'&business_id='+this.business_id+'&date='+Date();
      
      // }
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
      this.router.navigate(['/admin/business'])
  
      })
    }
    else{
      this.api.Postwithouttoken(environment["Category"] + "/edit_business" ,body )
      .subscribe(edit_business => {
  
        // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
      console.log(edit_business);
      this.router.navigate(['/admin/business'])
      })
    }
  }
  else{
    this.error="Should provide Main image"
    setTimeout(() => {
      this.error=""
    }, 3000);
  }
    }
    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      
  }
  uploadtofirebase(files){
        let business_image_id =Math.random().toString(36).substr(2, 9);

    // localStorage.removeItem("imageurl");
    this.progresshow=true
    const filePath = `business/type1/`;
    let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value+'_'+business_image_id:business_image_id
    var n = imagename+'_'+Date.now();
    const byteString = this.dataURLtoFile(this.croppedImage,imagename);
    const file = byteString
    console.log(file);
    const fileRef = this.storage.ref(filePath+n);
    const task = this.storage.upload(filePath+n, file);
    console.log(task);
    
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL =  fileRef.getDownloadURL();
          
          this.downloadURL
          .pipe(
            tap({
              next: (x) => {
                console.log('tap success', x);
              },
              error: (err) => {
                console.log('tap error', err);
              },
              complete: () => {console.log('tap complete')
              
              console.log(localStorage.getItem('imageurl'));
            }
            }),
            finalize(() => {
            console.log(this.fbs);
            files.value=""
                console.log(this.type1images);
                
                this.progresshow=false
                this.cropperhide=true
                // localStorage.setItem('imageurl',encodeURIComponent(this.fbs))
                this.type1images=[{business_image_id:business_image_id,url:encodeURIComponent(this.fbs),showurl:this.fbs,type:this.addmaincategory.get('imagetype').value}]
                console.log(this.type1images);
              // return 'completed'
            }
            )
            )
            .subscribe(url => {
              if (url) {
                this.fbs = url;
                // localStorage.setItem('imageurl',encodeURIComponent(url))
          
            }
          });
        })
      )
      .subscribe(
  
      );
      // return task.percentageChanges();
    // this.firebase.uploadfile(this.croppedImage,filePath,imagename)
    // .pipe(
    //   tap({
    //     next: (x) => {
    //       console.log('tap success', x);
    //       // this.isLoading = false;
    //     },
    //     error: (err) => {
    //       console.log('tap error', err);
    //       // this.isLoading = false;
    //     },
    //     complete: () => {console.log('tap complete')

    //     console.log(localStorage.getItem('imageurl'));

    //   }
    //   }),
    //   finalize(() => {
    //     file.value=""
    //     console.log(this.type1images);
        
    //     this.progresshow=false
    //     this.cropperhide=true
    //     this.type1images=[{business_image_id:business_image_id,url:localStorage.getItem('imageurl'),showurl:decodeURIComponent(localStorage.getItem('imageurl')),type:this.addmaincategory.get('imagetype').value}]
    //     console.log(this.type1images);
    //   })
    // )
    // .subscribe(
    //   percentage => {
    //     this.percentage = Math.round(percentage ? percentage : 0);
    //     console.log(this.percentage);
    //     if(this.percentage==100){
    //     }
        
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  
  }
  multipleuploadtofirebase(files){
    let business_image_id =Math.random().toString(36).substr(2, 9);

    // localStorage.removeItem("imageurl");
    this.progresshow=true
    const filePath = `business/type2/`;
    let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value+'_'+business_image_id:business_image_id
    var n = imagename+'_'+Date.now();
    const byteString = this.dataURLtoFile(this.croppedImage,imagename);
    const file = byteString
    console.log(file);
    const fileRef = this.storage.ref(filePath+n);
    const task = this.storage.upload(filePath+n, file);
    console.log(task);
    
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL =  fileRef.getDownloadURL();
          
          this.downloadURL
          .pipe(
            tap({
              next: (x) => {
                console.log('tap success', x);
              },
              error: (err) => {
                console.log('tap error', err);
              },
              complete: () => {console.log('tap complete')
              
              console.log(localStorage.getItem('imageurl'));
            }
            }),
            finalize(() => {
            console.log(this.fbs);
            files.value=""
                console.log(this.type1images);
                
                this.progresshow=false
                this.cropperhide=true
                this.images.push({business_image_id:business_image_id,url:encodeURIComponent(this.fbs),showurl:this.fbs,type:this.addmaincategory.get('imagetype').value})
                console.log(this.type1images);
    
            }
            )
            )
            .subscribe(url => {
              if (url) {
                this.fbs = url;
          
            }
          });
        })
      )
      .subscribe(
  
      );
 
  }
  multiplegalleryuploadtofirebase(files){
    let business_image_id =Math.random().toString(36).substr(2, 9);

    // localStorage.removeItem("imageurl");
    this.progresshow=true
    const filePath = `business/type3/`;
    let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value+'_'+business_image_id:business_image_id
    var n = imagename+'_'+Date.now();
    const byteString = this.dataURLtoFile(this.croppedImage,imagename);
    const file = byteString
    console.log(file);
    const fileRef = this.storage.ref(filePath+n);
    const task = this.storage.upload(filePath+n, file);
    console.log(task);
    
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL =  fileRef.getDownloadURL();
          
          this.downloadURL
          .pipe(
            tap({
              next: (x) => {
                console.log('tap success', x);
              },
              error: (err) => {
                console.log('tap error', err);
              },
              complete: () => {console.log('tap complete')
              
              console.log(localStorage.getItem('imageurl'));
            }
            }),
            finalize(() => {
            console.log(this.fbs);
            files.value=""
                console.log(this.galleryimages);
                
                this.progresshow=false
                this.cropperhide=true
                this.galleryimages.push({business_image_id:business_image_id,url:encodeURIComponent(this.fbs),showurl:this.fbs,type:this.addmaincategory.get('imagetype').value})
                console.log(this.galleryimages);
    
            }
            )
            )
            .subscribe(url => {
              if (url) {
                this.fbs = url;
          
            }
          });
        })
      )
      .subscribe(
  
      );
 
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
  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
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
cropperHide(type){
  this.addmaincategory.get('imagetype').setValue(type)
  this.cropperhide=false
}
changedata(type,event){
  console.log(type);
  console.log(event);
  if(type=='service_name'){
    this.service_name_options.push(this.service_name.value)
    this.service_name.setValue('')
  }
  else if(type=='arabic_service_name'){
    this.arabic_service_name_options.push(this.arabic_service_name.value)
    this.arabic_service_name.setValue('')
  }
  
}
  
}
