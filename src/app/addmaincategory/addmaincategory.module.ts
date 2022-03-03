import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmaincategoryRoutingModule } from './addmaincategory-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddmaincategoryRoutingModule,
    ImageCropperModule
  ]
})
export class AddmaincategoryModule { }
