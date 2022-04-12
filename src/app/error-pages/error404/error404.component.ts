import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  isLoading: boolean;
  constructor() {
    
  }
  
  isIOSDevice(){
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  }
  ngOnInit() {
    if(!this.isIOSDevice()){
      console.log("I am an IOS device!");
      window.location.href='https://apps.apple.com/us/app/dalelna/id1618244391'
   }
   else{
      window.location.href='https://play.google.com/store/apps/details?id=www.dalelna.co'

   }
  }

}
