import { Component } from "@angular/core";
import { Control } from "@angular/common";
import { RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";

import {Auth} from "./services";
import {MdToolbar} from "@angular2-material/toolbar";
import {MdButton, MdAnchor} from "@angular2-material/button";
import {MD_SIDENAV_DIRECTIVES} from "@angular2-material/sidenav";

import {
  EventService,
  PlaceService,
  TagService
} from "./services";

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
    styles: [`.demo-fill-remaining {
                flex: 1 1 auto;
              }`],
    providers: [
      Auth,
      PlaceService,
      EventService,
      TagService
    ],
    directives: [
    ROUTER_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdAnchor,
    MD_SIDENAV_DIRECTIVES
   ]
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
  constructor(private auth: Auth) { }

}
