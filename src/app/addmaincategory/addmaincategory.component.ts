import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup,FormControl, Validators, FormBuilder, NgControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { FirbaseService } from '../services/firbase.service';

import { ValidationmessagesService } from '../services/validationmessages.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
interface JsonEntryForm {
  name: string;
  arabic_name: string;
  image_url: string;
  order_column: string;
  is_active: string;
  main_category_id: string;
}
@Component({
  selector: 'app-addmaincategory',
  templateUrl: './addmaincategory.component.html',
  styleUrls: ['./addmaincategory.component.scss'],
  providers:[ValidationmessagesService]
})
export class AddmaincategoryComponent implements OnInit {

  title = 'ngImageCrop';
  // imageurl:any="assets/images/maincategory/demo.png"
  imageChangedEvent: any = '';
  croppedImage: any = '';
  subcaterories:any =[]
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
    main_category_id: any;
    testfile:string | Blob
    selecetdFile: string;
    main_category_validation_message:any={}
    fbs;
    downloadURL: Observable<string>;
    percentage:number=-1
    cropperhide:boolean=false
    progresshow:boolean=false
    addoredit:string='add'
    afteruploadimage
    old_subselect :Array<any>= [];
    // @Input() public appFormControl: NgControl;
  constructor(private router : Router,
    private fb : FormBuilder,
    // private http:HttpClient,
    private api:ApiService,
    private validationmessagesService:ValidationmessagesService,
    // private storage:AngularFireStorage,
    private firebase:FirbaseService,
    private storage:AngularFireStorage) {
    this.params = this.router.getCurrentNavigation().extras.state;
    this.addmaincategory= this.fb.group({

      name: new FormControl('',Validators.compose([Validators.required])),
      arabic_name: new FormControl('',Validators.compose([Validators.required])),
      image_url: new FormControl('',Validators.compose([Validators.required])),
      order_column: new FormControl(3,Validators.compose([Validators.required])),
      is_active: new FormControl(true,Validators.compose([Validators.required])),
      main_category_id:new FormControl('',Validators.compose([Validators.required])),
      selectedsub:new FormControl('',Validators.compose([Validators.required])),

      // main_category_id:new FormControl(main_category_id, [Validators.required])
      // Isactive: ['', Validators.required],
      // Image: ['', Validators.required],
      // subcaterories: this.fb.array(this.subcaterories),

    });
   }

  ngOnInit(): void {
    this.main_category_validation_message = this.validationmessagesService.Main_Category_Validation_Message;
    this.params=history.state;
    this.main_category_id=this.params.main_category_id
    this.datas=JSON.parse(this.params.data)
    let body = 'date='+Date()+'&main_category_id='+this.main_category_id;
    var api
    if(this.main_category_id ==='new')
    {
      this.addoredit='add'
    }
    else
    {
      this.addoredit='edit'
      this.addmaincategory.get('name').setValue(this.datas['name'])
      this.addmaincategory.get('arabic_name').setValue(this.datas['arabic_name'])
      this.addmaincategory.get('image_url').setValue(encodeURIComponent(this.datas['image_url']))
      this.afteruploadimage = this.datas['image_url']
      this.addmaincategory.get('order_column').setValue(this.datas['order_column'])
      this.addmaincategory.get('is_active').setValue(this.datas['is_active'])
      this.addmaincategory.get('main_category_id').setValue(this.main_category_id)
      this.addmaincategory.get('selectedsub').setValue(this.old_subselect[0].name)
    } 
  }
  onSubmit(){

  // this.addmaincategory.get('image_url').setValue(localStorage.getItem('imageurl'))
  // console.log(this.addmaincategory.get('image_url').value);

    console.log("onSubmit");
    console.log(this.addmaincategory.value);
    console.log(this.subcaterories);
    let selected_subcategory = []
    let index = this.subcaterories.findIndex( item =>item.name == this.addmaincategory.get('selectedsub').value )
    console.log(index);

    if(index !==-1)
      selected_subcategory.push(this.subcaterories[index])
    // this.subcaterories = this.subcaterories.filter(item=>item.value==true)
    let body = 'data='+JSON.stringify(this.addmaincategory.value)+'&date='+Date();
    // 'name='+this.addmaincategory.get('Name').value+
    // 'image_url='+this.addmaincategory.get('Image').value+
    // 'name='+this.addmaincategory.get('Name').value+
    // +'&date='+Date();

    // name, image_url, order_column, is_active
    console.log(body);
    if(this.main_category_id == 'new')
    {
    this.api.Postwithouttoken(environment["Category"] + "/add_main_category" ,body )
    .subscribe(add_main_category => {

      // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    console.log(add_main_category);
    // this.router.navigate()
    this.router.navigate(['/maincatogory'])

    })
  }
  else{
    this.api.Postwithouttoken(environment["Category"] + "/edit_main_category" ,body )
    .subscribe(edit_main_category => {

      // this.datas =(maincategorydata.status)?  maincategorydata.data:[]
    console.log(edit_main_category);
    this.router.navigate(['/maincatogory'])
    })
  }

  }
  fileChangeEvent(event: any): void {
    this.croppedImage=''
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
              this.afteruploadimage=this.fbs
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
//   this.progresshow=true
//   const filePath = `maincategory/`;
//   let imagename=(this.addmaincategory.get('name').value!=='')?this.addmaincategory.get('name').value:'unknown'
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
  // alert("crop")
  //  this.addmaincategory.get('image_url').setValue('assets/images/maincategory/demo.png')
  this.croppedImage = event.base64;
  this.afteruploadimage=this.croppedImage


    // console.log(event);

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
// onFileSelected(event) {
//   var n = Date.now();
//   const file = event.target.files[0];
//   const filePath = `maincategory/${n}`;
//   const fileRef = this.storage.ref(filePath);
//   const task = this.storage.upload(`maincategory/${n}`, file);
//   console.log(task);

//   task
//     .snapshotChanges()
//     .pipe(
//       finalize(() => {
//         this.downloadURL = fileRef.getDownloadURL();
//         this.downloadURL.subscribe(url => {
//           if (url) {
//             this.fbs = url;
//           }
//           console.log(this.fbs);
//         });
//       })
//     )
//     .subscribe(url => {
//       if (url) {
//         console.log(url);
//       }
//     });
// }
cropperHide(){
  this.cropperhide=false
}

}
