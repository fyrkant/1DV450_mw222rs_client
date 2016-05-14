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
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json" });
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .map(val => val.json().data)
      .do(v => console.log(v))
      .map(places => places.map(
        (
          { attributes: {
            name,
            lat,
            lng
          },
          id,
          relationships
        }
        ) =>
        (
          {
            id: parseInt(id),
            name,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            relationships
          }))
      );
      // .subscribe(p => console.log(p));
  }

}
