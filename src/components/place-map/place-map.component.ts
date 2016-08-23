import { Component, OnInit } from "@angular/core";

import {
  Auth,
  EventService,
  PlaceService,
  TagService,
  FlashService,
} from "../../services";

import { TagFilterPipe, SearchPipe } from "../../pipes";

@Component({
  pipes: [TagFilterPipe, SearchPipe],
  selector: "pa-place-map",
  styles: [require("./place-map.component.css")],
  template: require("./place-map.component.html"),
})

export class PlaceMapComponent implements OnInit {
  private places: Array<any>;
  private events: Array<any>;
  private tags: Array<any>;

  // google maps zoom level
  private zoom: number = 4;

  // initial center position for the map
  private lat: number = 60.673858;
  private lng: number = 12.815982;

  private formShowing = false;

  constructor(
    private auth: Auth,
    private placeService: PlaceService,
    private eventService: EventService,
    private tagService: TagService,
    private flash: FlashService
  ) {
  }

  public clickedMarker(label: string, index: number) {
    // window.alert(`clicked the marker: ${label || index}`);
  }

  public ngOnInit() {
    this.placeService.getPlaces().then(places => this.places = places);
    this.eventService.getEvents().then(e => this.events = e);
    this.tagService.getTags().then(tags => this.tags = tags);
  }

  public getEventLat(event) {
    const place = this.places && this.places.filter(p => p.id === event.relationships.place.data.id)[0];
    const lat = parseFloat(place.attributes.lat);

    return lat;
  }

  public getEventLng(event) {
    const place = this.places && this.places.filter(p => p.id === event.relationships.place.data.id)[0];
    const lng = parseFloat(place.attributes.lng);

    return lng;
  }

  public getPlaceLat = place => parseFloat(place.attributes.lat)
  public getPlaceLng = place => parseFloat(place.attributes.lng)

  public getEventTags(event) {
    const tagIds = event.relationships.tags.data.map(obj => obj.id);
    const tags = this.tags && this.tags.filter(t => tagIds.indexOf(t.id) !== -1);

    return tags;
  }

  public getEventsOnPlace = place =>
    this.events && this.events.filter(event => event.relationships.place.data.id === place.id)

  public centerMapOnEvent(event) {
    this.lat = this.getEventLat(event);
    this.lng = this.getEventLng(event);
    this.zoom = 7;
  }

  public eventHasTag(event) {
    return event.relationships.tags.data.length !== 0;
  }

  public deleteEvent(e) {
    const promise = this.eventService.deleteEvent(e.id);

    promise
      .then(res => {
          this.flash.setMessage("Successfully deleted event.");
          this.eventService.getEvents().then(events => this.events = events);
        })
      .catch(err => this.flash.setError(err.message || "Something got messed up!!"));
  }

  public checkIfCurrentUsers(event) {
    const currentUserId = this.auth.getCurrentId();

    return event.relationships.user.data.id === currentUserId;
  }

  public mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

  public toggleForm() {
    this.formShowing = !this.formShowing;
  }
  public savedNewEvent() {
    this.formShowing = false;
    this.eventService.getEvents().then(e => this.events = e);
  }
}
