import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Material } from '../models/material.model';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {
  @Input('total') totalCost: number = 0;
  @Input('materials') materials: Material[] = [];
  selectedId!: Observable<string>;
  @Output('selectedMaterial') selectedMaterial = new EventEmitter<Material>()
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.selectedId = this.store.select('material').pipe(map(m=>m.selected?.id!))
  }

  onListSelect(ev: MatSelectionListChange){
    console.log(ev.options[0].value)
    this.selectedMaterial.next(ev.options[0].value)
  }

}
