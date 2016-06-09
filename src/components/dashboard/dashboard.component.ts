import { Component } from "@angular/core";
import {Observable} from "rxjs/Observable";
import C from "../../constants";

import { PlaceService } from "../../services";

@Component({
  selector: "dashboard",
  styles: [`.dash-div {
    margin: 10px;
  }`],
  template: require("./dashboard.component.html")
})

export class DashboardComponent {
  constructor(private placeService: PlaceService) {
  }
  increment() {
    this.placeService.getPlaces();
  }
}
