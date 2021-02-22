import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduceMaterialsComponent } from './produce-materials/produce-materials.component';

const routes: Routes = [{ path: '', component: ProduceMaterialsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduceRoutingModule { }
