import { Component, OnInit } from "@angular/core";
import { Router, CanActivate } from "@angular/router-deprecated";
import { tokenNotExpired } from "angular2-jwt";

import {
  MapsAPILoader,
  NoOpMapsAPILoader,
  MouseEvent,
  ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from "angular2-google-maps/core";

import {MD_CARD_DIRECTIVES} from "@angular2-material/card";
import {MD_LIST_DIRECTIVES} from "@angular2-material/list";

import {TagFilterPicker} from "../../components/tag-filter-picker/tag-filter-picker.component.ts";

import {
  EventService,
  PlaceService,
  TagService
} from "../../services";

import {TagFilterPipe} from "../../pipes";

import {Place} from "../../models";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "place-map",
  pipes: [TagFilterPipe],
  directives: [
  TagFilterPicker,
  ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
  MD_CARD_DIRECTIVES,
  MD_LIST_DIRECTIVES
  ],
  template: require("./place-map.component.html"),
  styles: [require("./place-map.component.css")]
})

 @CanActivate(() => tokenNotExpired())

export class PlaceMapComponent implements OnInit {
  places: Array<any>;
  events: Array<any>;
  tags: Array<any>;

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
    this.placeService.getPlaces().then(places => this.places = places);
    this.eventService.getEvents().then(e => this.events = e);
    this.tagService.getTags().then(tags => this.tags = tags);
  }

  getEventLat(event) {
    const place = this.places && this.places.filter(p => p.id === event.relationships.place.data.id)[0];
    const lat = parseFloat(place.attributes.lat);

    return lat;
  }

  getEventLng(event) {
    const place = this.places && this.places.filter(p => p.id === event.relationships.place.data.id)[0];
    const lng = parseFloat(place.attributes.lng);

    return lng;
  }

  getEventTags(event) {
    const tagIds = event.relationships.tags.data.map(obj => obj.id);
    const tags = this.tags.filter(t => tagIds.indexOf(t.id) !== -1);

    return tags;
  }

  centerMapOnEvent(event) {
    this.lat = this.getEventLat(event);
    this.lng = this.getEventLng(event);
    this.zoom = 7;
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
