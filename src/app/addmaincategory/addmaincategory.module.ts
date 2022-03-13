import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmaincategoryRoutingModule } from './addmaincategory-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddmaincategoryRoutingModule,
    ImageCropperModule
  ]
})
export class AddmaincategoryModule { }
