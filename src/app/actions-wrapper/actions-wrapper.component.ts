import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import * as alias from '../store/materials.actions';

@Component({
  selector: 'app-actions-wrapper',
  templateUrl: './actions-wrapper.component.html',
  styleUrls: ['./actions-wrapper.component.scss']
})
export class ActionsWrapperComponent implements OnInit {
  canDelete!: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.canDelete = this.store.select('material').pipe(map(state=>!state.selected))
  }

  addMaterial(){
    this.store.dispatch(alias.produceStart({payload: null, edit: false}))
  }

  deleteMaterial(){
    this.store.dispatch(alias.removeStart());

  }

}
