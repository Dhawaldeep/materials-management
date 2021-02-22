import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Material } from './models/material.model';
import { AppState } from './store/app.state';
import * as alias from "./store/materials.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Materials';
  totalCost: number = 0;
  materials!: Observable<Material[]>;
  selectedId: string | null = null; 
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.materials = this.store.select('material').pipe(map(s => {
      const materials = Object.keys(s.materials).map(k => s.materials[k]);
      this.totalCost = materials.reduce((acc, curr)=>{
        return acc+ (curr.cost ?? 0)*(curr.volume ?? 0);
      }, 0);
      this.selectedId = s.selected?.id!;
      console.log(this.totalCost)
      return materials
    }))
  }

  selectedMtl(material: Material){
    this.store.dispatch(alias.produceStart({payload: material, edit: true}));
  }
}
