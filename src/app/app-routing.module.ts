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
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: MainlayoutComponent,
    children: [
  { path: 'dashboard', component: DashboardComponent },
  // loadChildren:() => import('./maincatogory/maincatogory.module').then(m => m.MaincatogoryModule
  { path: 'maincatogory',component:MaincatogoryComponent },
  { path: 'addmaincategory',component:AddmaincategoryComponent },
  { path: 'subcategory',component:SubcategoryComponent },
  { path: 'addsubcategory',component:AddsubcategoryComponent },
  { path: 'business',component:BusinessComponent },
  { path: 'addbusiness',component:AddbusinessComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
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
