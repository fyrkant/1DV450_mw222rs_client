import { Component } from "@angular/core";
import { Control } from "@angular/common";
import { ROUTER_DIRECTIVES } from "@angular/router";

import {Auth} from "./services";
import {MdToolbar} from "@angular2-material/toolbar";
import {MdButton, MdAnchor} from "@angular2-material/button";
import {MD_SIDENAV_DIRECTIVES} from "@angular2-material/sidenav";

import {
  EventService,
  PlaceService,
  TagService,
  RouteGuard
} from "./services";

import {
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

export class AppComponent {
  constructor(private auth: Auth) { }

}
