import { Component } from "angular2/core";
import { Router } from "angular2/router";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/merge";

@Component({
  selector: "login",
  template: require("./login.component.html")
})

export class LoginComponent {
  click$ = new Subject()
    .map(val => val);

  constructor () {
    Observable.merge(this.click$).subscribe(x => console.log(x));
  }
}
