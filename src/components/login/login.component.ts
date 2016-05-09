import { Component } from "angular2/core";
import {
  ControlGroup,
  FormBuilder,
  FORM_DIRECTIVES,
  FORM_BINDINGS,
  Validators
} from "angular2/common";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/merge";
import {Auth} from "../../services";

@Component({
  selector: "login",
  template: require("./login.component.html"),
  viewBindings: [FORM_BINDINGS],
  directives: [FORM_DIRECTIVES]
})

export class LoginComponent {
  click$ = new Subject()
    .map(val => val + "hello");

  loginForm;
  constructor(fb: FormBuilder, private auth: Auth) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  doLogin(event) {
    console.log(event);
    console.log(this.loginForm.value);

    const data = this.loginForm.value;

    this.auth.postLogin(data);
    event.preventDefault();
  }
}

