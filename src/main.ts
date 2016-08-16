import { bootstrap } from "@angular/platform-browser-dynamic";
import { provide, enableProdMode } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { Location
       , LocationStrategy
       , HashLocationStrategy } from "@angular/common";
import { FORM_PROVIDERS } from '@angular/forms';

import {GOOGLE_MAPS_PROVIDERS} from "angular2-google-maps/core";

import { provideStore } from "@ngrx/store";
import { AUTH_PROVIDERS, JwtHelper } from "angular2-jwt";

import { AppComponent } from "./app.component";

import { APP_ROUTER_PROVIDER } from "./routes";
import {counter} from "./reducers/";
import initialState from "./initial-state";
import { RouteGuard } from "./services"

if (process.env.ENV === "production") {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDER,
  FORM_PROVIDERS,
  GOOGLE_MAPS_PROVIDERS,
  AUTH_PROVIDERS,
  JwtHelper,
  RouteGuard,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provideStore({ counter }, initialState)
])
  .then(success => console.log("Bootstrap success!"))
  .catch(error => console.log(error));
