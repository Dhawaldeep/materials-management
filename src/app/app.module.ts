import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './header/header.component';
import { ActionsWrapperComponent } from './actions-wrapper/actions-wrapper.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { DummyComponent } from './dummy/dummy.component';
import { MaterialEffects } from './store/materials.effects';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionServiceModule } from 'ngx-connection-service';
import { materialReducer } from './store/materials.reducer';
import { AppState } from './store/app.state';
// import { createCustomElement } from '@angular/elements';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ActionsWrapperComponent,
    MaterialsListComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    ConnectionServiceModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    StoreModule.forRoot<AppState>({ material: materialReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([MaterialEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents: [AppComponent]
})
export class AppModule {
  // constructor(private injector: Injector) {
  //   const myElement = createCustomElement(AppComponent, { injector });
  //   customElements.define('mtl-manag-element', myElement);
  // }
  // ngDoBootstrap(appRef: ApplicationRef) {
  //   if (document.querySelector('app-root')) {
  //     appRef.bootstrap(AppComponent);
  //   }
  // }

}
