import {Injectable, NgZone} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  lock = new Auth0Lock('92e9wK3bYFJwWfGmaMgAGmKayl8EcSIG', 'fyrkant.eu.auth0.com');
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;

  constructor(
    private authHttp: AuthHttp,
    zone: NgZone,
    private router: Router,
    private jwtHelper: JwtHelper
    ) {
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login({token}) {
    // Show the Auth0 Lock widget
    console.log(token);

    const decoded = this.jwtHelper.decodeToken(token);

    localStorage.setItem('profile', JSON.stringify(decoded.end_user_id));
    localStorage.setItem('id_token', token);
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.zoneImpl.run(() => this.user = null);
    this.router.navigate(['Login']);
  }
}
