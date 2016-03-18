import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {Control} from "angular2/common";

import "../sass/base.scss";

@Component({
    selector: "app",
    templateUrl: "app.html"
})
class App {}

bootstrap(App);
