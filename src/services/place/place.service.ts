import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import C from "../../constants";

import "rxjs/operator/map";
import "rxjs/operator/do";

@Injectable()
export class PlaceService {
  url: string = `${C.BASE_API_URL}/places`;
  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  public getPlaces() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY});
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .toPromise()
      .then(val => val.json().data)
      .catch(e => console.log(e));
      // .subscribe(p => console.log(p));
  }

}
