import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTMLPipe } from '../services/html.pipe'

import { MaincatogoryRoutingModule } from './maincatogory-routing.module';
import { AddmaincategoryComponent } from '../addmaincategory/addmaincategory.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaincatogoryRoutingModule,
    ImageCropperModule,
    AngularCropperjsModule,
    MatIconModule
  ]
})
export class MaincatogoryModule { }
