import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {Observable} from 'rxjs';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxBootstrapIconsModule, shield, shieldShaded, shieldFill} from 'ngx-bootstrap-icons';

import {AuthenticationInterceptor} from './services/authentication.interceptor';
import {AuthenticationService} from './services/authentication.service';
import {AppComponent} from './app.component';
import {RequestComponent} from './components/request/request.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { FileFormComponent } from './components/file-form/file-form.component';
import { AlertModule } from './components/_alert';
import { FileNavigationComponent } from './components/file-navigation/file-navigation.component';
import { SearchComponent } from './components/search/search.component';
import { FileTableComponent } from './components/file-table/file-table.component';

const bootstrapIcons = {
  shield,
  shieldShaded,
  shieldFill,
};

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    DemoComponent,
    FileFormComponent,
    FileNavigationComponent,
    SearchComponent,
    FileTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(bootstrapIcons),
    AlertModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakLoaderFactory,
      deps: [AuthenticationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function keycloakLoaderFactory(authenticationService: AuthenticationService): () => Promise<any> | Observable<any> {
  return () => authenticationService.init();
}
