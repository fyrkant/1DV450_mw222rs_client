import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions } from "@angular/http";
import C from "../../constants";
import { FlashService } from "../flash/flash.service";

import "rxjs/operator/map";
import "rxjs/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class EventService {
  private url: string = `${C.BASE_API_URL}/events`;

  constructor(
    private authHttp: AuthHttp,
    private http: Http,
    private flash: FlashService,
    private router: Router) {
  }

  public getEvents() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY});
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .toPromise()
      .then(val => val.json().data)
      .catch(e => this.flash.setError(e.message || "Something bad happened..."));
  }
  public saveEvent(event) {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json"});
    const options: RequestOptions = new RequestOptions({ headers });
    const payload = JSON.stringify(event);

    return this.authHttp.post(this.url, payload, options)
      .toPromise();
  }
  public deleteEvent(id) {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY});
    const options: RequestOptions = new RequestOptions({ headers });
    const url = this.url + "/" + id;

    if (confirm("Do you really want to delete this event?")) {
      return this.authHttp.delete(url, options)
        .toPromise();
    }
    return undefined;
  }

}
