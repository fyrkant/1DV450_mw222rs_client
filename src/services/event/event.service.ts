import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import C from "../../constants";
import { FlashService } from "../flash/flash.service";

import "rxjs/operator/map";
import "rxjs/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class EventService {
  url: string = `${C.BASE_API_URL}/events`;

  constructor(private authHttp: AuthHttp, private http: Http, private flash: FlashService, private router: Router) {
  }

  public getEvents() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY});
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .toPromise()
      .then(val => val.json().data)
      .catch(e => console.log(e));
  }
  public saveEvent(event) {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json"});
    const options: RequestOptions = new RequestOptions({ headers });
    const payload = JSON.stringify(event);

    console.log(payload);

    this.authHttp.post(this.url, payload, options)
      .toPromise()
      .then(newEvent => {
        console.log(newEvent);
        this.flash.setMessage("Successfully saved new event!");
        this.router.navigate(["map"]);
      })
      .catch(err => {
        this.flash.setError(err.message || "Something got messed up!");
        console.log(err);
    });
  }

}
