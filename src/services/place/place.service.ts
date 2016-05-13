import { Injectable } from "angular2/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "angular2/http";
import C from "../../constants";

import "rxjs/operator/map";

@Injectable()
export class PlaceService {
  url: string = `${C.BASE_API_URL}/places`;
  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  public getPlaces() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json" });
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .map(val => val.json().data)
      .map(places => places.map(({attributes: {name, lat, lng}}) => ({ name, lat: parseFloat(lat), lng: parseFloat(lng) })));
      // .subscribe(p => console.log(p));
  }

}
