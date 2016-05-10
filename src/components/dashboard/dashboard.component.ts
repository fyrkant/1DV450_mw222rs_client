import { Component } from "angular2/core";
import { Router } from "angular2/router";
import {Observable} from "rxjs/Observable";
import C from "../../constants";

import { PlaceService } from "../../services";

@Component({
  selector: "dashboard",
  template: require("./dashboard.component.html")
})

export class DashboardComponent {
  constructor(private placeService: PlaceService) {
  }
  increment() {
    this.placeService.getPlaces();
  }
}
