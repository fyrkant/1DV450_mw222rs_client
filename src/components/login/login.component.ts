import { Component } from "angular2/core";
import { Http, Headers, RequestOptions, Response } from "angular2/http";
import { Router } from "angular2/router";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/merge";

import C from "../../constants";

@Component({
  selector: "login",
  template: require("./login.component.html")
})

export class LoginComponent {
  click$ = new Subject()
    .map(val => val + "hello");

  getData() {
    let headers = new Headers({ 'X-Api-key': C.API_KEY });
    let options = new RequestOptions({ headers: headers });


    this.http.get("http://lit-river-92285.herokuapp.com/api/places", options)
      .map(val => val)
      .subscribe(res => console.log(res.json()));
  }

  constructor (private http: Http) {
    Observable.merge(this.click$).subscribe(x => console.log(x));
  }
}
