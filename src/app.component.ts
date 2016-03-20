import {Component} from "angular2/core";
import {Control} from "angular2/common";

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
