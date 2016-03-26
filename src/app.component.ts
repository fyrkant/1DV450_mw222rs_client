import { Component } from "angular2/core";
import { Control } from "angular2/common";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";

import { DashboardComponent } from "./dashboard/dashboard";
import { AboutComponent } from "./about/about";

import "../sass/base.scss";

@Component({
    selector: "app",
    template: require("./app.component.html"),
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
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
  }
 ])
export class AppComponent {
  clickHandler(event) {
    console.log(event);
  }
}
