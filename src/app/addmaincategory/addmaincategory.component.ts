import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup,FormControl, Validators, FormBuilder, NgControl } from '@angular/forms';
import { data } from 'jquery';
import { map, catchError } from 'rxjs/operators';
import { Http, RequestOptions,Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-addmaincategory',
  templateUrl: './addmaincategory.component.html',
  styleUrls: ['./addmaincategory.component.scss']
})
export class AddmaincategoryComponent implements OnInit {

  title = 'ngImageCrop';
  imageurl:any="assets/images/maincategory/demo.png"
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/maincategory/demo.png';
  subcaterories:any =[{name:'sub1',value:true},{name:'sub2',value:true},{name:'sub3',value:false},{name:'sub4',value:true},]
  datas=[
    {id:'11',imageurl:'https://www.gstatic.com/webp/gallery/1.jpgg',name:'azar',number:'1431254',order:1,isactive:true},
    {id:'22',imageurl:'assets/images/maincategory/demo.png',name:'azar1',number:'1431254',order:2,isactive:true},
    {id:'33',imageurl:'assets/images/maincategory/demo.png',name:'azar2',number:'1431254',order:3,isactive:true},
    {id:'44',imageurl:'assets/images/maincategory/demo.png',name:'azar3',number:'1431254',order:4,isactive:true},
    {id:'55',imageurl:'assets/images/maincategory/demo.png',name:'azar4',number:'1431254',order:5,isactive:true},
    {id:'66',imageurl:'assets/images/maincategory/demo.png',name:'azar5',number:'1431254',order:6,isactive:false}
  ]
    params: { [k: string]: any; };
    addmaincategory:FormGroup
    id: any;
    // @Input() public appFormControl: NgControl;
  constructor(private router : Router,
    private fb : FormBuilder,
    private http:HttpClient) {
    this.params = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    this.params=history.state;
    this.id=this.params.id
    // alert(JSON.stringify(this.params))
    let index = this.datas.findIndex(item=>item.id==this.id)
    this.addmaincategory= new FormGroup({
      
      Name: new FormControl(this.datas[index].name, [Validators.required]),
      Isactive: new FormControl(this.datas[index].isactive, [Validators.required]),
      Image: new FormControl(this.datas[index].imageurl, [Validators.required]),

      // Isactive: ['', Validators.required],
      // Image: ['', Validators.required],
      // subcaterories: this.fb.array(this.subcaterories),

    });
    this.subcaterories.forEach(element => {
      this.addmaincategory.addControl(element.name, new FormControl(element.value, Validators.required));

    });
    // https://www.gstatic.com/webp/gallery/1.jpg
    this.imageChangedEvent= this.http
    .get("https://www.gstatic.com/webp/gallery/1.jpg", {
      responseType: 'arraybuffer'
   })
    .pipe(
      map((response:any) => {
        return new File([response], "myImage.png");
      })
    );
    console.log(this.imageChangedEvent);
    
  }
  onSubmit(){
    console.log("onSubmit");
    
  }
  fileChangeEvent(event: any): void {
    console.log(event);
    
    this.imageChangedEvent = event;
}
imageCropped(event:ImageCroppedEvent) {
    console.log(event);
    
    this.croppedImage = event.base64;
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
}
