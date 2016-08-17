import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import C from "../../constants";
import { FlashService } from "../flash/flash.service";

@Injectable()
export class Auth {
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  url: string = `${C.BASE_API_URL}/auth`;

  constructor(
    private http: Http,
    zone: NgZone,
    private router: Router,
    private jwtHelper: JwtHelper,
    private flash: FlashService
    ) {
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem("profile"));
  }

  public authenticated() {
    // Check if there"s an unexpired JWT
    return tokenNotExpired();
  }
  public postLogin(loginData: JSON) {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json" });
    const options: RequestOptions = new RequestOptions({ headers });
    const body = JSON.stringify(loginData);


    this.http.post(this.url, body, options)
        .toPromise()
        .then((res: Response) => {
          this.login(res.json());
          this.flash.setMessage('Logged in successfully!')
        })
        .catch(err => {
          const error = err.json();
          this.flash.setError(error.message || 'Oh dear, something went wrong!')
        });
  }

  public login({token}) {
    const decoded = this.jwtHelper.decodeToken(token);

    localStorage.setItem("profile", JSON.stringify(decoded.end_user_id));
    localStorage.setItem("id_token", token);
  }

  public logout() {
    if (confirm("Are you sure that you want to log out?")) {
      localStorage.removeItem("profile");
      localStorage.removeItem("id_token");
      this.zoneImpl.run(() => this.user = null);
      this.router.navigate(["dashboard"]);
      this.flash.setMessage('Successfully logged out!')
    }
  }

  public getCurrentId() {
    const data = localStorage.getItem("profile");

    if (!data) {
      return null;
    }

    return data["end_user_id"];
  }
}
