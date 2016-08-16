import { Component } from "@angular/core";
import {
  ControlGroup,
  FormBuilder,
  Validators
} from "@angular/common";
import {FORM_DIRECTIVES} from "@angular/forms"
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/observable/merge";
import {Auth} from "../../services";

@Component({
  selector: "login",
  template: require("./login.component.html"),
  directives: [FORM_DIRECTIVES]
})

export class LoginComponent {

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

