import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from '../mainlayout/mainlayout.component';
import { AddmaincategoryComponent } from '../addmaincategory/addmaincategory.component';
import { MaincatogoryComponent } from './maincatogory.component';

const routes: Routes = [
  // {
    // path: '',
    // // component: MainlayoutComponent,
    // // redirectTo:'main',
    // children: [
    //   // { path: 'main', component: MainlayoutComponent },
    //   { path: 'addmaincategory', component: AddmaincategoryComponent },
    // ]
  // },
    // ]

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaincatogoryRoutingModule { }
// export const Maincatogoryroutedcomponents = [
//   AddmaincategoryComponent,MainlayoutComponent
// ]