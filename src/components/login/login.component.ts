import { Component } from "angular2/core";
import { Http } from "angular2/http";
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
    .map(val => val + "hello");

  getData() {
    this.http.get("http://lit-river-92285.herokuapp.com/api/places")
      .map(val => console.log(val))
      .subscribe(val => console.log(val));
  }

  constructor (private http: Http) {
    Observable.merge(this.click$).subscribe(x => console.log(x));
  }
}
