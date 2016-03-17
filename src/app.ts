import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {Control} from "angular2/common";

import "../sass/base.scss";

@Component({
    selector: 'app',
    template: `<div class="test-class">hej</div>`
})
class App{}

bootstrap(App);
