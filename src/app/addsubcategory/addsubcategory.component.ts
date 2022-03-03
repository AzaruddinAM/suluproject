import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.scss']
})
export class AddsubcategoryComponent implements OnInit {
  title = 'ngImageCrop';
  imageurl:any="assets/images/maincategory/demo.png"
  imageChangedEvent: any = '';
  croppedImage: any = '';
  subcaterories:any =['sub1','sub2','sub1','sub2','sub1','sub2','sub1','sub2']
  constructor() { }

  ngOnInit(): void {
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
