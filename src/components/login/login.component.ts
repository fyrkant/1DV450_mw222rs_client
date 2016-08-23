import { Component } from "@angular/core";
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms";
import { Auth } from "../../services";
import { Router } from "@angular/router";

@Component({
  directives: [REACTIVE_FORM_DIRECTIVES],
  selector: "pa-login",
  template: require("./login.component.html"),
  viewProviders: [FormBuilder],
})

export class LoginComponent {
  private loginForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  constructor(fb: FormBuilder, private auth: Auth, private router: Router) {
    this.email = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.loginForm = fb.group({
      email: this.email,
      password: this.password,
    });
  }
  public doLogin(event) {
    const data = this.loginForm.value;
    this.auth.postLogin(data);
    event.preventDefault();
  }
}
