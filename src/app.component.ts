import { Component } from "angular2/core";
import { Control } from "angular2/common";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "angular2/router";

import "../sass/base.scss";

@Component({
    selector: "app",
    templateUrl: "app.component.html"
})
export class AppComponent {
  clickHandler(event) {
    console.log(event);
  }
}
