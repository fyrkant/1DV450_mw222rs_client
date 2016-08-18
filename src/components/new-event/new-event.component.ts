import { Component, OnInit } from "@angular/core";
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms";

import {
  EventService,
  PlaceService,
  Auth
} from "../../services";

@Component({
  selector: "new-event-form",
  viewProviders: [FormBuilder],
  template: require("./new-event.component.html"),
  styles: [`.event-input {
    display: block;
    width: 250px;
  }`],
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class NewEventForm implements OnInit {
  events: Promise<any>;
  places;
  userId: number;

  fb: FormBuilder;
  eventForm: FormGroup;
  name: FormControl;
  description: FormControl;
  date: FormControl;
  place_id: FormControl;

  stringDater(dateString) {
    return new Date(dateString);
  }

  constructor(
    private eventService: EventService,
    private placeService: PlaceService,
    private auth: Auth,
    fb: FormBuilder
    ) {
      this.name = new FormControl("", Validators.required);
      this.description = new FormControl("", Validators.required);
      this.date = new FormControl("", Validators.required);
      this.place_id = new FormControl("", Validators.required);
      this.eventForm = fb.group({
        name: this.name,
        description: this.description,
        date: this.date,
        place_id: this.place_id
      });

    }

  ngOnInit() {
    this.eventService.getEvents().then(events => this.events = events);
    this.placeService.getPlaces().then(places => this.places = places);

    this.userId = this.auth.getCurrentId();
  }

  isCurrentUsersEvent(eventCreatorId: string) {
    const isCurrentUsersEvent = parseInt(eventCreatorId) === this.userId;

    return isCurrentUsersEvent;
  }

  saveEvent(event) {
    const data = {event: this.eventForm.value };
    // console.log(data);

    this.eventService.saveEvent(data);
  }
  clearForm() {
    this.eventForm.reset();
  }

}
