import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AllComponent } from './all/all.component';
import { DraftComponent } from './draft/draft.component';

const routes: Routes = [
  {
    path: '',
    component: AllComponent,
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path:'draft',
    component: DraftComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
