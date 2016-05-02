import { Component } from "angular2/core";
import {
  ControlGroup,
  FormBuilder,
  FORM_DIRECTIVES,
  FORM_BINDINGS,
  Validators
} from "angular2/common";
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
  template: require("./login.component.html"),
  viewBindings: [FORM_BINDINGS],
  directives: [FORM_DIRECTIVES]
})

export class LoginComponent {
  click$ = new Subject()
    .map(val => val + "hello");

  postLogin(loginData: JSON) {
    let headers: Headers = new Headers({ 'X-Api-key': C.API_KEY, "Content-Type": "application/json" });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    const body = JSON.stringify(loginData);


    this.http.post("http://lit-river-92285.herokuapp.com/api/auth", body, options)
      .map(val => val)
      .subscribe((res: Response) => console.log(res.json()));
  }

  // constructor (private http: Http) {
  //   Observable.merge(this.click$).subscribe(x => console.log(x));
  // }

  loginForm;
  constructor(fb: FormBuilder, private http: Http) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  doLogin(event) {
    console.log(event);
    console.log(this.loginForm.value);

    const data = this.loginForm.value;

    this.postLogin(data);
    event.preventDefault();
  }
}

