import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize,catchError, tap } from "rxjs/operators";
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

            localStorage.setItem('imageurl',encodeURIComponent(this.fbs))
            return 'completed'
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
    return task.percentageChanges();

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
