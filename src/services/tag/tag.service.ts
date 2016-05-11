import { Injectable } from "angular2/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "angular2/http";
import C from "../../constants";

import "rxjs/operator/map";

@Injectable()
export class TagService {
  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  public getTags() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json" });
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(`${C.BASE_API_URL}/tags`, options)
      .map(val => console.log(val.json()))
      .subscribe(p => console.log(p));
  }

}
