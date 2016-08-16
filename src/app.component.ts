import { Component } from "@angular/core";
import { Control } from "@angular/common";

import {Auth} from "./services";

import "../sass/base.scss";

@Component({
    selector: "app",
    template: require("./app.component.html"),
    styles: [`.demo-fill-remaining {
                flex: 1 1 auto;
              }`]
})

export class AppComponent {
  constructor(private auth: Auth) { }

}
