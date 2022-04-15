import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddmaincategoryComponent } from './addmaincategory/addmaincategory.component';
import { MaincatogoryComponent } from './maincatogory/maincatogory.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { SubcategoryComponent } from './subcategory/subcategory.component'
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { BusinessComponent } from './business/business.component';
import { AddbusinessComponent } from './addbusiness/addbusiness.component';
import { UsersComponent } from './users/users.component';
import { BusinessenqueryComponent } from './businessenquery/businessenquery.component';
import { NotificationComponent } from './notification/notification.component';
import { LocationComponent } from './location/location.component';
import { Error404Component } from './error-pages/error404/error404.component';
import { Error500Component } from './error-pages/error500/error500.component';
import { AuthGuard } from './auth.guard';
import { ListlocationComponent } from './listlocation/listlocation.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
const routes: Routes = [
  // { path: '', redirectTo: 'error', pathMatch: 'full' },
  // { path: '', component: Error404Component },
  // { path: 'privacy', component: Error500Component },

  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainlayoutComponent,
    
    canActivate: [AuthGuard],
    children: [
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  // loadChildren:() => import('./maincatogory/maincatogory.module').then(m => m.MaincatogoryModule
  { path: 'maincatogory',component:MaincatogoryComponent,canActivate: [AuthGuard] },
  { path: 'addmaincategory',component:AddmaincategoryComponent,canActivate: [AuthGuard] },
  { path: 'subcategory',component:SubcategoryComponent,canActivate: [AuthGuard] },
  { path: 'addsubcategory',component:AddsubcategoryComponent,canActivate: [AuthGuard] },
  { path: 'business',component:BusinessComponent,canActivate: [AuthGuard] },
  { path: 'addbusiness',component:AddbusinessComponent,canActivate: [AuthGuard] },
  { path: 'users',component:UsersComponent,canActivate: [AuthGuard] },
  { path: 'viewusers',component:ViewusersComponent,canActivate: [AuthGuard] },
  { path: 'businessenqueries',component:BusinessenqueryComponent,canActivate: [AuthGuard] },
  { path: 'notification',component:NotificationComponent,canActivate: [AuthGuard] },
  { path: 'listlocation',component:ListlocationComponent,canActivate: [AuthGuard] },
  { path: 'location',component:LocationComponent,canActivate: [AuthGuard] },

  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  // { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  // { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  // { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  // { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  // { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
      ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
