import { Component, OnInit } from "@angular/core";
import {Observable} from "rxjs/Observable";

import {
  EventService,
  Auth
} from "../../services";

@Component({
  selector: "about",
  template: require("./about.component.html"),
  styles: [`.current {
    color: red;
  }`]
})

export class AboutComponent implements OnInit {
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
