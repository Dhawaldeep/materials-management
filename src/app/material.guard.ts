import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AppState } from "./store/app.state";

@Injectable({ providedIn: 'root' })
export class MaterialGuard implements CanActivate, CanLoad {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(
  ): Observable<boolean> {
    return this.store.select('material').pipe(map(m => {
      const exists = !!m.selected;
      if (!exists) this.router.navigate(['/']);
      return exists
    }));
  }

  canLoad() {
    return this.canActivate();
  }
}