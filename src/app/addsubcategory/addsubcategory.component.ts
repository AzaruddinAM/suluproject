import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ValidationmessagesService } from '../services/validationmessages.service';
import { FirbaseService } from '../services/firbase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.scss']
})
export class AddsubcategoryComponent implements OnInit {
    title = 'ngImageCrop';
    // imageurl:any="assets/images/maincategory/demo.png"
    imageChangedEvent: any = '';
    croppedImage: any = '';
    subcaterories:any =[]
    datas={}
    maincategorydata
    maincategory
    main_category_id
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
      sub_category_validation_message:any={}
      percentage:number=-1
      cropperhide:boolean=false
      progresshow:boolean=false
      addoredit:string='add'
      afterupload
      downloadURL: Observable<string>;
  fbs: string;
  // type1images: {  url: string; showurl: string; }[];
      // @Input() public appFormControl: NgControl;
    constructor(private router : Router,
      private fb : FormBuilder,
      private http:HttpClient,
      private api:ApiService,
      private validationmessagesService:ValidationmessagesService,
      private firebase:FirbaseService,
      private storage:AngularFireStorage) {
      this.params = this.router.getCurrentNavigation().extras.state;
     }
  
    ngOnInit(): void {
      this.sub_category_validation_message = this.validationmessagesService.Sub_Category_Validation_Message;
      this.params=history.state;
      this.sub_category_id=this.params.sub_category_id
      this.datas=JSON.parse(this.params.data)

      let body = 'data='+'test'+'&date='+Date();
      console.log(body);
      
      this.api.Postwithouttoken(environment["Category"] + "/get_main_category" ,body)
      // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

      .subscribe(maincategorydata => {

        this.maincategorydata =(maincategorydata.status)?  maincategorydata.data:[]
        console.log(this.maincategorydata);
      
      })


      if(this.sub_category_id !=='new')
      {
        this.addoredit='edit'
      // alert(JSON.stringify(this.params))
      // let index = this.datas.findIndex(item=>item.id==this.id)

      let body = 'data='+'test'+'&date='+Date();
      console.log(body);
      
      this.api.Postwithouttoken(environment["Category"] + "/get_main_category" ,body)
      // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

      .subscribe(maincategorydata => {

        this.maincategorydata =(maincategorydata.status)?  maincategorydata.data:[]
        console.log(this.maincategorydata);
        let body1 = 'sub_category_id='+this.sub_category_id;
        this.api.Postwithouttoken(environment["Category"] + "/get_sub_category_by_id" ,body1)
        .subscribe(main_category_id => {
          // this.main_category_id = main_category_id.data.main_category_id;
          // this.maincategorydata =(maincategorydata.status)?  maincategorydata.data:[]
          console.log(this.main_category_id);
          var temp = this.maincategorydata.filter(item =>item.main_category_id==main_category_id.data.main_category_id)
          this.main_category_id = temp[0];
          this.maincategory = this.main_category_id;
          console.log(temp[0].name);
          this.addmaincategory.get('main_category_name').setValue(temp[0].name)
        
        })
      
      })
        
      this.addmaincategory= new FormGroup({
        // name , image_url , order_column ,  is_active , id 
        name: new FormControl(this.datas['name'], [Validators.required]),
        arabic_name: new FormControl(this.datas['arabic_name'], [Validators.required]),
        image_url: new FormControl(this.datas['image_url'], [Validators.required]),
        main_category_name: new FormControl('', [Validators.required]),
        order_column: new FormControl(this.datas['order_column'], [Validators.required]),
        is_active: new FormControl(this.datas['is_active'], [Validators.required]),
  
        sub_category_id:new FormControl(this.sub_category_id, [Validators.required])
        // Isactive: ['', Validators.required],
        // Image: ['', Validators.required],
        // subcaterories: this.fb.array(this.subcaterories),
  
      });
      this.afterupload=this.addmaincategory.get('image_url').value
    //   this.subcaterories.forEach(element => {
    //     this.addmaincategory.addControl(element.name, new FormControl(element.value, Validators.required));
  
    //   });
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
        this.addoredit='add'
        let sub_category_id=Math.random().toString(36).substr(2, 9);
        this.addmaincategory= new FormGroup({
          name: new FormControl('', [Validators.required]),
          arabic_name: new FormControl(this.datas['arabic_name'], [Validators.required]),
          image_url: new FormControl('assets/images/maincategory/demo.png', [Validators.required]),
          main_category_name: new FormControl('', [Validators.required]),
          order_column: new FormControl('', [Validators.required]),
          is_active: new FormControl(true, [Validators.required]),
  
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
      
    }


    changemaincategory(event){

      // this.addmaincategory.get('main_category_name').setValue(event)
      let index =this.maincategorydata.findIndex( item => item.name==event)
      // this.addmaincategory.get('arabic_sub_name').setValue(this.maincategorydata[index].arabic_name)
  
      console.log(this.maincategorydata[index])
      this.maincategory = this.maincategorydata[index];
      // this.maincaterories = this.maincaterories.map( (item) => {
      //   if(item.name==event)
      //     return { name:item.name ,arabic_name:item.arabic_name ,main_category_id:item.main_category_id,value:true }
      //   else
      //     return { name:item.name ,arabic_name:item.arabic_name  ,main_category_id:item.main_category_id,value:false }
      // })
  
    }


    
    onSubmit(){
      console.log("onSubmit");
      console.log(this.addmaincategory.value);
      
      let body = 'data='+JSON.stringify(this.addmaincategory.value)+'&main_category_id='+this.maincategory['main_category_id'];
      // 'name='+this.addmaincategory.get('Name').value+
      // 'image_url='+this.addmaincategory.get('Image').value+
      // 'name='+this.addmaincategory.get('Name').value+
      // +'&date='+Date();
  
      // name, image_url, order_column, is_active
      console.log(body);
      if(this.sub_category_id == 'new')
      {
      this.api.Postwithouttoken(environment["Category"] + "/add_sub_category" ,body )
      .subscribe(add_sub_category => {
  
        // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
      console.log(add_sub_category);
      // this.router.navigate()
      this.router.navigate(['/subcategory'])

  
      })
    }
    else{
      this.api.Postwithouttoken(environment["Category"] + "/edit_sub_category" ,body )
      .subscribe(edit_sub_category => {
  
        // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
      console.log(edit_sub_category);
      this.router.navigate(['/subcategory'])
      })
    }
      
    }
    fileChangeEvent(event: any): void {
      this.croppedImage = ''
      this.imageChangedEvent = event;
      // this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
      
  }
  uploadtofirebase(files){
    this.progresshow=true
    const filePath = `subcategory/`;
    let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value:'unknown'
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
            files.value=""
                
                this.progresshow=false
                this.cropperhide=true
                // localStorage.setItem('imageurl',encodeURIComponent(this.fbs))
                // this.type1images=[{url:encodeURIComponent(this.fbs),showurl:this.fbs}]
                this.afterupload=this.fbs
                this.addmaincategory.get('image_url').setValue(encodeURIComponent(this.fbs))

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
  //   localStorage.removeItem("image_url");
  //   this.progresshow=true
  //   const filePath = `subcategory/`;
  // let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value:'unknown'
  //   this.firebase.uploadfile(this.croppedImage,filePath,imagename)
  //   .subscribe(
  //     percentage => {
  //       this.percentage = Math.round(percentage ? percentage : 0);
  //       console.log(this.percentage);
  //       if(this.percentage==100){
  //         this.cropperhide=true
  //         this.progresshow=false
  //   // this.addmaincategory.get('image_url')
  //   file.value=""
  // console.log(localStorage.getItem('imageurl'));
  // this.addmaincategory.get('image_url').setValue(localStorage.getItem('imageurl'))
  
  //       }
        
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
    // .subscribe(data=>{
  
    // }
    // )
    // console.log(imageurl);
    
    // this.addmaincategory.get('image_url').setValue(this.firebase.uploadfile(this.croppedImage,filePath,'azar'))
    // console.log(this.addmaincategory.get('image_url').value);
    
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
