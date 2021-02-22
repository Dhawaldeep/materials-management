import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConnectionService } from 'ngx-connection-service';
import { of } from 'rxjs';
import { map, tap, switchMap, withLatestFrom, first, filter, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material.model';
import { AppState } from './app.state';

import * as alias from './materials.actions';

@Injectable()
export class MaterialEffects implements OnInitEffects {
    fetched: boolean = false;
    online: boolean = false;
    constructor(private actions$: Actions, private snackbar: MatSnackBar, private http: HttpClient, private router: Router, private store: Store<AppState>, private connectionService: ConnectionService) { }

    ngrxOnInitEffects() {
        this.connectionService.updateOptions({
            heartbeatUrl: `${environment.apiUrl}`,
        })
        this.connectionService.monitor().pipe(filter((val) => {
            console.log('Has Internet Access',val.hasInternetAccess)
            if(!this.online && val.hasInternetAccess){
                this.snackbar.open('Online', 'ok');
            }
            if(this.online && !val.hasInternetAccess){
                this.snackbar.open('Offline', 'ok');
            }
            this.online = val.hasInternetAccess;
            return val.hasInternetAccess
        })).subscribe(_=>{
            this.store.dispatch(alias.online());
            if(!this.fetched) {
                this.store.dispatch(alias.readStart());
            }
        })
        return alias.readStart()
    }

    onlineMaterials$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(alias.online),
            withLatestFrom(this.store.select('material')),
            switchMap(([_, state]) => {
                const { unsaved, unremoved } = state;
                const saveacions = unsaved.map(id => alias.saveStart({ payload: state.materials[id] }));
                const removeactions = Object.keys(unremoved).map(id=> alias.bulkRemoveStart({payload: id}))
                return [...saveacions, ...removeactions]
            })
        )
    })

    readMaterials$ = createEffect(() =>
        this.actions$.pipe(
            ofType(alias.readStart),
            switchMap(async () => {
                try {
                    const res = await this.http.get<{ data: Material[], message: string, status: number }>(`${environment.apiUrl}`).toPromise()
                    const { data, message } = res;
                    this.snackbar.open(message, 'ok');
                    this.fetched = true;
                    return alias.read({ payload: data });
                } catch (error) {
                    console.log(error);
                    return alias.error({ typeError: null, error, payload: null });
                }
            })
        )
    );

    produceStartMaterial$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(alias.produceStart),
            switchMap(async ({ payload, edit }) => {
                try {
                    if (edit) {
                        return alias.produce({ payload: payload! });
                    }
                    const res = await this.http.post<{ data: Material, message: string }>(`${environment.apiUrl}`, {}).toPromise();
                    const { data, message } = res;
                    this.snackbar.open(message, 'ok');
                    return alias.produce({ payload: data });
                } catch (error) {
                    console.log(error);
                    return alias.error({ typeError: 'produce', error, payload: null });
                }
            }),
        )
    })

    produceMaterial$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(alias.produce),
            tap(() => this.router.navigate(['/produce']))
        )
    }, { dispatch: false })

    saveMaterial$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(alias.saveStart),
            switchMap(async ({ payload }) => {
                try {
                    const res = await this.http.put<{ data: Material, message: string }>(`${environment.apiUrl}`, payload).toPromise();
                    const { data, message } = res;
                    this.snackbar.open(message, 'ok');
                    return alias.save({ payload: data });
                } catch (error) {
                    console.log(error);
                    return alias.error({ typeError: 'remove', error, payload });
                }
            }),
        )
    })

    bulkRemoveMaterial$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(alias.bulkRemoveStart),
            switchMap(async({payload}) => {
                try {
                    const res = await this.http.delete<{ data: string, message: string }>(`${environment.apiUrl}/${payload}`).toPromise();
                    const {data} = res;
                    return alias.remove({ payload: data });
                } catch (error) {
                    console.log('CLEAN UP Error');
                    return alias.error({payload: null, error, typeError: null})
                }
            })
        )
    })

    removeMaterial$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(alias.removeStart),
            withLatestFrom(this.store.select('material')),
            map(([_, state]) => ({ payload: state.selected!, unremoved: state.unremoved })),
            switchMap(async ({ payload }) => {
                try {
                    const res = await this.http.delete<{ data: string, message: string }>(`${environment.apiUrl}/${payload.id}`).toPromise();
                    const { message, data } = res;
                    this.snackbar.open(message, 'ok');
                    return alias.remove({ payload: data })
                } catch (error) {
                    console.log(error);
                    return alias.error({ typeError: 'remove', error, payload });
                }
            }),
        )
    })

    errorMaterial$ = createEffect(() =>
        this.actions$.pipe(
            ofType(alias.error),
            filter(({error, typeError})=> typeError !== 'bulkremove'),
            tap(({ error, typeError }) => {
                console.log(error);
                if(error.status >= 500  || error.status <200 ){
                    switch (typeError) {
                        case 'save':
                            this.snackbar.open("Oops! the device is offline. Don't worry your changes will be saved when it gets online. Just don't close the browser tab!", 'ok')
                            break;
                        case 'remove':
                            this.snackbar.open("Oops! you are offline. Don't worry your material will be deleted when it gets online. Just don't close the browser tab!", 'ok')
                            break;
                        case 'produce':
                            this.snackbar.open("Oops! you are offline. Please try again when the device gets online", 'ok')
                            break;                   
                        default:

                            this.snackbar.open(this.fetched?error.statusText:'Offline', 'ok');
                            break;
                    }
                }else{
                    this.snackbar.open(error.error.message, 'ok');
                }
            })
        ), { dispatch: false }
    );

    bulkRemoveEFB$ = createEffect(()=>
            this.actions$.pipe(
                ofType(alias.error),
                filter(({typeError})=> typeError === 'bulkremove'),
                switchMap(()=>{
                    this.snackbar.open('Syncing with server!')
                    return [alias.readStart()]
                }),
                catchError(err=>of(alias.error({typeError: null, error: err, payload: null})))
            )
    )


}