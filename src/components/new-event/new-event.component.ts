import { Component, OnInit } from "@angular/core";

import {MD_INPUT_DIRECTIVES} from "@angular2-material/input";

import {
  EventService,
  Auth
} from "../../services";

@Component({
  selector: "new-event-form",
  directives: [MD_INPUT_DIRECTIVES],
  template: require("./new-event.component.html")
})

export class NewEventForm implements OnInit {
  events: Promise<any>;
  userId: number;

  stringDater(dateString) {
    return new Date(dateString);
  }

  constructor(private eventService: EventService, private auth: Auth) {}

  ngOnInit() {
    this.eventService.getEvents().then(events => this.events = events);

    this.userId = this.auth.getCurrentId();
  }

  isCurrentUsersEvent(eventCreatorId: string) {
    const isCurrentUsersEvent = parseInt(eventCreatorId) === this.userId;

    return isCurrentUsersEvent;
  }

}
