import { Component } from "angular2/core";
import { Control } from "angular2/common";
import { RouteConfig
       , Location
       , LocationStrategy
       , HashLocationStrategy
       , ROUTER_DIRECTIVES
       , ROUTER_PROVIDERS } from "angular2/router";

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';

import {
  AboutComponent,
  DashboardComponent,
  LoginComponent,
  PlaceMapComponent
} from "./components";

import "../sass/base.scss";

@Component({
    selector: "app",
    template: require("./app.component.html"),
    directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
@RouteConfig([
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: "/about",
    name: "About",
    component: AboutComponent
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent
  },
  {
    path: "/map",
    name: "Map",
    component: PlaceMapComponent
  }
 ])
export class AppComponent {
  lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_NAMESPACE');

  constructor() { }
  clickHandler(event) {
    console.log(event);
  }
  login() {
    var hash = this.lock.parseHash();
    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.lock.getProfile(hash.id_token, function(err, profile) {
          if (err) {
            console.log(err);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', hash.id_token);
        });
    }
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
