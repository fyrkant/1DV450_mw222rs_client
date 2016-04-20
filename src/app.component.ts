import { Component } from "angular2/core";
import { Control } from "angular2/common";
import { RouteConfig
       , Location
       , LocationStrategy
       , HashLocationStrategy
       , ROUTER_DIRECTIVES
       , ROUTER_PROVIDERS } from "angular2/router";

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

import {
  AboutComponent,
  DashboardComponent,
  LoginComponent,
  PlaceMapComponent
} from "./components";

import "../sass/base.scss";

@Component({
    selector: "app",
    template: require("./app.component.html"),
    directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
@RouteConfig([
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: "/about",
    name: "About",
    component: AboutComponent
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent
  },
  {
    path: "/map",
    name: "Map",
    component: PlaceMapComponent
  }
 ])
export class AppComponent {
  clickHandler(event) {
    console.log(event);
  }

}
