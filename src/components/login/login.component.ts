import { Component } from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, Validators} from "@angular/forms"
import {Auth} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: "login",
  template: require("./login.component.html"),
  directives: [FORM_DIRECTIVES]
})

export class LoginComponent {

  loginForm;
  constructor(fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  doLogin(event) {
    const data = this.loginForm.value;
    this.auth.postLogin(data);
    event.preventDefault();
  }
}

