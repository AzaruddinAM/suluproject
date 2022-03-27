import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';



import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { MaincatogoryComponent } from './maincatogory/maincatogory.component';
import {TableModule} from 'primeng/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddmaincategoryComponent } from './addmaincategory/addmaincategory.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { BusinessComponent } from './business/business.component';
import { AddbusinessComponent } from './addbusiness/addbusiness.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersComponent } from './users/users.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  BUCKET
} from "@angular/fire/storage";
// import { BUCKET } from '@angular/fire/compat/storage';
// import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
const APP_CONTAINERS = [
  MainlayoutComponent
];
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AppComponent,
    ...APP_CONTAINERS,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    MaincatogoryComponent,
    AddmaincategoryComponent,
    SubcategoryComponent,
    AddsubcategoryComponent,
    BusinessComponent,
    AddbusinessComponent,
    UsersComponent
  ],
  imports: [
    // StorageBucket
    // AngularFirestore,
    MatSelectModule,
    MatProgressBarModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    TableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    ImageCropperModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
    
  ],
  providers: [ThemeService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: BUCKET, useValue: "dalelna-abb4e.appspot.com" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
