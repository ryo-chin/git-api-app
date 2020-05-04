import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommitListPageComponent } from './pages/commit-list-page/commit-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: CommitListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitsRoutingModule { }
