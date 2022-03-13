import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup,FormControl, Validators, FormBuilder, NgControl } from '@angular/forms';
import { data } from 'jquery';
import { map, catchError } from 'rxjs/operators';
import { Http, RequestOptions,Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ValidationmessagesService } from '../services/validationmessages.service';
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
  imageurl:any="assets/images/maincategory/demo.png"
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/maincategory/demo.png';
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
    // @Input() public appFormControl: NgControl;
  constructor(private router : Router,
    private fb : FormBuilder,
    private http:HttpClient,
    private api:ApiService,
    private validationmessagesService:ValidationmessagesService) {
    this.params = this.router.getCurrentNavigation().extras.state;
    this.addmaincategory= this.fb.group({
        
      name: new FormControl('',Validators.compose([Validators.required])),
      arabic_name: new FormControl('',Validators.compose([Validators.required])),
      image_url: new FormControl('assets/images/maincategory/demo.png',Validators.compose([Validators.required])),
      order_column: new FormControl(3,Validators.compose([Validators.required])),
      is_active: new FormControl(true,Validators.compose([Validators.required]))

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
    let body = 'date='+Date();
    this.api.Postwithouttoken(environment["Category"] + "/get_sub_category_list" ,body )
    .subscribe(sub_category => {
      // this.subcaterories= sub_category.data
      this.subcaterories = (sub_category.status) ? sub_category.data:[]
      this.subcaterories =this.subcaterories.map(({ name, sub_category_id ,value }) => ({name, sub_category_id ,value}))
      console.log(this.subcaterories);
      
    
    if(this.main_category_id !=='new')
    {
    // alert(JSON.stringify(this.params))
    // let index = this.datas.findIndex(item=>item.id==this.id)
  this.addmaincategory.get('name').setValue(this.datas['name'])
  this.addmaincategory.get('arabic_name').setValue(this.datas['arabic_name'])
  this.addmaincategory.get('image_url').setValue(this.datas['image_url'])
  this.addmaincategory.get('order_column').setValue(this.datas['order_column'])
  this.addmaincategory.get('is_active').setValue(this.datas['is_active'])

    // this.addmaincategory= new FormGroup({
    //   // name , image_url , order_column ,  is_active , id 
    //   name: new FormControl(this.datas['name'], [Validators.required]),
    //   arabic_name: new FormControl(this.datas['arabic_name'], [Validators.required]),
    //   image_url: new FormControl(this.datas['image_url'], [Validators.required]),
    //   order_column: new FormControl(this.datas['order_column'], [Validators.required]),
    //   is_active: new FormControl(this.datas['is_active'], [Validators.required]),

    //   main_category_id:new FormControl(this.main_category_id, [Validators.required])
    //   // Isactive: ['', Validators.required],
    //   // Image: ['', Validators.required],
    //   // subcaterories: this.fb.array(this.subcaterories),

    // });
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
  //   console.log(this.imageChangedEvent);
    }
    else{
      // let main_category_id=Math.random().toString(36).substr(2, 9);
      // alert("alert")

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
  })
  }
  onSubmit(){
    console.log("onSubmit");
    console.log(this.addmaincategory.value);
    console.log(this.subcaterories);
    
    this.subcaterories = this.subcaterories.filter(item=>item.value==true)
    let body = 'data='+JSON.stringify(this.addmaincategory.value)+'&sub_categories_id='+JSON.stringify(this.subcaterories)+'&date='+Date();
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
