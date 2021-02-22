import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColorEvent } from 'ngx-color';
import { Subscription } from 'rxjs';
import { Material } from 'src/app/models/material.model';
import { AppState } from '../../store/app.state';
import * as alias from "../../store/materials.actions";

@Component({
  selector: 'app-produce-materials',
  templateUrl: './produce-materials.component.html',
  styleUrls: ['./produce-materials.component.scss']
})
export class ProduceMaterialsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  hide: boolean = true;
  now: any = new Date();
  updated: boolean = false;
  selectedMaterial: Material | null = null;
  subscriptions: Subscription = new Subscription();
  loading: boolean = false;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(this.selectedMaterial?.name, Validators.required),
      'color': new FormControl(this.selectedMaterial?.color, Validators.required),
      'volume': new FormControl(this.selectedMaterial?.volume, Validators.required),
      'cost': new FormControl(this.selectedMaterial?.cost, Validators.required),
      'deliveryDate': new FormControl(this.selectedMaterial?.deliveryDate, Validators.required)
    })
    this.subscriptions.add(
      this.store.select('material').subscribe(material=>{
        this.loading = material.loading;
        console.log(material);
        if(this.selectedMaterial?.id !== material.selected?.id && this.updated ){
          this.selectedMaterial = material.selected;
          if(!this.selectedMaterial) this.router.navigate(['/'])
          this.form.patchValue({
            'name': material.selected?.name,
            'color': material.selected?.color,
            'volume': material.selected?.volume,
            'cost': material.selected?.cost,
            'deliveryDate': material.selected?.deliveryDate
          })
        }
        this.updated = true;
      })
    )
    
    this.subscriptions.add(
      this.form.valueChanges.subscribe(val=>{
        if(this.selectedMaterial && !this.loading){
          const payload = new Material(this.selectedMaterial?.id, val.name, val.color, val.volume, val.cost, val.deliveryDate)
          this.store.dispatch(alias.update({payload}));
          if(this.form.valid){
            console.log('form valid');
            this.store.dispatch(alias.saveStart({payload}))
          }
        }
      })
    );
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  changeComplete(ev: ColorEvent){
    console.log(ev.color.hex);
    this.form.patchValue({'color': ev.color.hex});
  }

  get colorVal(){
    return this.form.get('color')?.value ?? 'brown'
  }

}
