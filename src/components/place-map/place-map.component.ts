import { Component, OnInit } from "@angular/core";
import { Router, CanActivate } from "@angular/router-deprecated";
import { tokenNotExpired } from "angular2-jwt";

import {
  MapsAPILoader,
  NoOpMapsAPILoader,
  MouseEvent,
  ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from "angular2-google-maps/core";


import {
  EventService,
  PlaceService,
  TagService
} from "../../services";

import {Place} from "../../models";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "place-map",
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  template: require("./place-map.component.html"),
  styles: [require("./place-map.component.css")]
})

 @CanActivate(() => tokenNotExpired())

export class PlaceMapComponent implements OnInit {
  places: Observable<Place>;
  events: Observable<any>;
  tags: Observable<any>;

  // google maps zoom level
  zoom: number = 4;

  // initial center position for the map
  lat: number = 60.673858;
  lng: number = 12.815982;

  constructor(
    private placeService: PlaceService,
    private eventService: EventService,
    private tagService: TagService
  ) {
  }

  clickedMarker(label: string, index: number) {
    // window.alert(`clicked the marker: ${label || index}`);
  }

  ngOnInit() {
    this.places = this.placeService.getPlaces();
    this.events = this.eventService.getEvents();
    this.tags = this.tagService.getTags();
  }


  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

  markerDragEnd(p: Place, $event: MouseEvent) {
    console.log("dragEnd", p, $event);
  }

}
