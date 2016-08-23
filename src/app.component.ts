import { Component } from "@angular/core";

import {Auth} from "./services";

import "../sass/base.scss";

@Component({
    selector: "app",
    styles: [`.demo-fill-remaining {
                flex: 1 1 auto;
              }`],
    template: require("./app.component.html"),
})

export class AppComponent {
  constructor(private auth: Auth) { }

}
