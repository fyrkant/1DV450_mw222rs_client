import { Component } from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl, FormGroup} from "@angular/forms"
import {Auth} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: "login",
  viewProviders: [FormBuilder],
  template: require("./login.component.html"),
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class LoginComponent {

  fb: FormBuilder;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(fb: FormBuilder, private auth: Auth, private router: Router) {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = fb.group({
      email: this.email,
      password: this.password
    });
  }
  doLogin(event) {
    const data = this.loginForm.value;
    this.auth.postLogin(data);
    event.preventDefault();
  }
}

