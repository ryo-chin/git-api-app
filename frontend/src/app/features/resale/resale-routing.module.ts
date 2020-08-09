import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResaleListPageComponent } from './pages/resale-list-page/resale-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResaleListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResaleRoutingModule {
}
