import { NgModule, provide, enableProdMode }       from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserModule  } from "@angular/platform-browser";
import { AppComponent }   from "./app.component";

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {MdButtonModule} from "@angular2-material/button";
import {MdCardModule} from "@angular2-material/card";
import {MdCoreModule} from "@angular2-material/core";
import {MdInputModule} from "@angular2-material/input";
import {MdListModule} from "@angular2-material/list";
import {MdSidenavModule} from "@angular2-material/sidenav";
import {MdToolbarModule} from "@angular2-material/toolbar";
import {APP_ROUTER_PROVIDER} from "./routes";
import {AgmCoreModule} from "angular2-google-maps/core";
import {JwtHelper, AUTH_PROVIDERS} from "angular2-jwt";
import {
  RouteGuard,
  Auth,
  PlaceService,
  TagService,
  EventService,
  FlashService,
} from "./services";

import {
  DashboardComponent,
  LoginComponent,
  PlaceMapComponent,
  TagFilterPicker,
  FlashMessageComponent,
  EventListComponent,
  SearchBoxComponent,
  PlacePageComponent,
  TagPageComponent,
} from "./components";

if (process.env.ENV === "production") {
  enableProdMode();
}

@NgModule({
    bootstrap:    [AppComponent],
    declarations: [
      TagFilterPicker,
      PlaceMapComponent,
      AppComponent,
      DashboardComponent,
      LoginComponent,
      FlashMessageComponent,
      EventListComponent,
      SearchBoxComponent,
      TagPageComponent,
      PlacePageComponent,
    ],
    imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule,
      MdButtonModule,
      MdCardModule,
      MdCoreModule,
      MdInputModule,
      MdListModule,
      MdSidenavModule,
      MdToolbarModule,
      AgmCoreModule.forRoot(),
     ],
    providers: [
      FlashService,
      Auth,
      EventService,
      TagService,
      PlaceService,
      APP_ROUTER_PROVIDER,
      AUTH_PROVIDERS,
      JwtHelper,
      RouteGuard,
      provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ],
})
export class AppModule {}
