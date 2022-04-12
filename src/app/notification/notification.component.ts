import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { FirbaseService } from '../services/firbase.service';
import { ValidationmessagesService } from '../services/validationmessages.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
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
          title: new FormControl('', [Validators.required]),
          body: new FormControl('', [Validators.required]),
          type: new FormControl('0', [Validators.required]),
          // order_column: new FormControl('', [Validators.required]),
          // is_active: new FormControl(true, [Validators.required]),
          // business_name:new FormControl('', [Validators.required]),
          // business_name:new FormControl('', [Validators.required]),
          url:new FormControl('', [Validators.required]),
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
      this.api.Postwithouttoken(environment["Category"] + "/add_notification" ,body )
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
    fileChangeEvent(event: any): void {
      this.croppedImage = ''
      this.imageChangedEvent = event;
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      
  }
  uploadtofirebase(file){
    localStorage.removeItem("image_url");
    this.progresshow=true
    const filePath = `subcategory/`;
  let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value:'unknown'
    this.firebase.uploadfile(this.croppedImage,filePath,imagename)
    .subscribe(
      percentage => {
        this.percentage = Math.round(percentage ? percentage : 0);
        console.log(this.percentage);
        if(this.percentage==100){
          this.cropperhide=true
          this.progresshow=false
    // this.addmaincategory.get('image_url')
    file.value=""
  console.log(localStorage.getItem('imageurl'));
  this.addmaincategory.get('image_url').setValue(localStorage.getItem('imageurl'))
  
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
  imageCropped(event:ImageCroppedEvent) {
  
      // console.log(event);
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      // this.croppedImage = event.base64;
      // console.log(event);
      this.croppedImage = event.base64
      this.afterupload = this.croppedImage
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
  cropperHide(){
    this.cropperhide=false
  }
}
