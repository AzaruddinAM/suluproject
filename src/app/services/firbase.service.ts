import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize,catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class FirbaseService {
  fbs;
  downloadURL: Observable<string>;
  constructor(private storage:AngularFireStorage,
    private sanitization : DomSanitizer,) { }
 uploadfile(base64,filePath,filename): Observable<number | undefined>
  {
    var n = filename+'_'+Date.now();
  const byteString = this.dataURLtoFile(base64,filename);
  const file = byteString
  console.log(file);
  // const filePath = `maincategory/${n}`;
  const fileRef = this.storage.ref(filePath+n);
  // this.storage.child('ajjus').putString(file,'base64',{ contentType :'image/jpeg'})
  const task = this.storage.upload(filePath+n, file);
  console.log(task);
  
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL =  fileRef.getDownloadURL();
        console.log(this.downloadURL);
        
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fbs = url;
            // return this.fbs
            console.log(this.sanitization.bypassSecurityTrustResourceUrl(url));
            localStorage.setItem('imageurl',encodeURIComponent(url))
          // return   this.fbs

          }
          console.log(this.fbs);
        });
      })
    )
    .subscribe(
    //   url => {
    //   if (url) {
    //     console.log(url);
    //     // console.log(this.fbs);
    //     // return url
    //   }
    // }
    );
    return task.percentageChanges();
  //   (await task).ref.getDownloadURL().then(url => {
  //     console.log(url);
      
  //      this.fbs =  url;
  //   console.log(this.fbs);
  //   // return this.sanitization.bypassSecurityTrustResourceUrl(url)
  // });

  }
  private dataURLtoFile(dataurl, filename) {
 
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
}
