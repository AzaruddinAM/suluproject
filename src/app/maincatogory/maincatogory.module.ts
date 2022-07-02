import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HTMLPipe } from '../services/html.pipe'

import { MaincatogoryRoutingModule } from './maincatogory-routing.module';
import { AddmaincategoryComponent } from '../addmaincategory/addmaincategory.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    MaincatogoryRoutingModule,
    ImageCropperModule,
    AngularCropperjsModule,
    MatIconModule
  ],
  providers:[ApiService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class MaincatogoryModule { }
