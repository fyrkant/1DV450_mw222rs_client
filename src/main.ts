import { bootstrap } from "angular2/platform/browser";
import { provide } from "angular2/core";
import { HTTP_PROVIDERS }    from 'angular2/http';
import { RouteConfig
       , Location
       , LocationStrategy
       , HashLocationStrategy
       , ROUTER_PROVIDERS } from "angular2/router";

import { MATERIAL_PROVIDERS } from "ng2-material/all";
import { provideStore } from '@ngrx/store';

import {
  ANGULAR2_GOOGLE_MAPS_PROVIDERS
} from 'angular2-google-maps/core';

import { AppComponent } from "./app.component";

import {clock, people} from "./reducers/";

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  HTTP_PROVIDERS,
  MATERIAL_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provideStore({ clock, people })
])
  .then(success => console.log("Bootstrap success!"))
  .catch(error => console.log(error));
