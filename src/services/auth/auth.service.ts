import {Injectable, NgZone} from "angular2/core";
import {Router} from "angular2/router";
import {AuthHttp, tokenNotExpired, JwtHelper} from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "angular2/http";
import C from "../../constants";

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  lock = new Auth0Lock("92e9wK3bYFJwWfGmaMgAGmKayl8EcSIG", "fyrkant.eu.auth0.com");
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    zone: NgZone,
    private router: Router,
    private jwtHelper: JwtHelper
    ) {
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem("profile"));
  }

  public authenticated() {
    // Check if there"s an unexpired JWT
    return tokenNotExpired();
  }
  
  public postLogin(loginData: JSON) {
    let headers: Headers = new Headers({ 'X-Api-key': C.API_KEY, "Content-Type": "application/json" });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    const body = JSON.stringify(loginData);


    this.http.post("http://lit-river-92285.herokuapp.com/api/auth", body, options)
        .map(val => val)
        .subscribe((res: Response) => {
          console.log(res.json());
          this.login(res.json());
        });
  }

  public login({token}) {
    // Show the Auth0 Lock widget
    console.log(token);

    const decoded = this.jwtHelper.decodeToken(token);

    localStorage.setItem("profile", JSON.stringify(decoded.end_user_id));
    localStorage.setItem("id_token", token);
  }

  public logout() {
    localStorage.removeItem("profile");
    localStorage.removeItem("id_token");
    this.zoneImpl.run(() => this.user = null);
    this.router.navigate(["Login"]);
  }
}
