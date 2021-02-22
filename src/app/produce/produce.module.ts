import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

import { ColorSketchModule } from 'ngx-color/sketch';

import { ProduceRoutingModule } from './produce-routing.module';
import { ProduceMaterialsComponent } from './produce-materials/produce-materials.component';


@NgModule({
  declarations: [ProduceMaterialsComponent],
  imports: [
    CommonModule,
    ProduceRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ColorSketchModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ProduceModule { }
