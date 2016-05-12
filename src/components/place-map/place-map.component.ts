import { Component, OnInit } from "angular2/core";
import { Router, CanActivate } from "angular2/router";
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
  template: require("./place-map.component.html")
})

 @CanActivate(() => tokenNotExpired())

export class PlaceMapComponent implements OnInit {
  places: Observable<Place>;
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
    window.alert(`clicked the marker: ${label || index}`);
    this.markers.splice(index, 1);
  }

  ngOnInit() {
    this.places = this.placeService.getPlaces();
    this.eventService.getEvents();
    this.tagService.getTags();
  }


  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "poop",
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: "C",
      draggable: true
    }
  ]
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
