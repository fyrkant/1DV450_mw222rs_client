import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import C from "../../constants";

import "rxjs/operator/map";
import "rxjs/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class EventService {
  url: string = `${C.BASE_API_URL}/events`;

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  public getEvents() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY});
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .toPromise()
      .then(val => val.json().data)
      .catch(e => console.log(e));
  }

}
