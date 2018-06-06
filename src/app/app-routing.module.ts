import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectorsComponent } from './sectors/sectors.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'sectors', component: SectorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
