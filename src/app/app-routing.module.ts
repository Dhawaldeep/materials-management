import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
import { MaterialGuard } from './material.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DummyComponent},
  { path: 'produce', loadChildren: () => import('./produce/produce.module').then(m => m.ProduceModule), canActivate: [MaterialGuard], canLoad: [MaterialGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
