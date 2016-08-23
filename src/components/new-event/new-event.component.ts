import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms";

import {
  EventService,
  PlaceService,
  TagService,
  FlashService,
  Auth,
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
  @Output() saveClick = new EventEmitter();

  events: Promise<any>;
  places: Promise<any>;
  tags: Promise<any>;
  userId: number;

  fb: FormBuilder;
  eventForm: FormGroup;
  name: FormControl;
  description: FormControl;
  date: FormControl;
  tagsForm: FormControl;
  place_id: FormControl;

  selectedTags;

  stringDater(dateString) {
    return new Date(dateString);
  }

  constructor(
    private eventService: EventService,
    private placeService: PlaceService,
    private tagService: TagService,
    private auth: Auth,
    private flash: FlashService,
    fb: FormBuilder
    ) {
      this.name = new FormControl("", Validators.required);
      this.description = new FormControl("", Validators.required);
      this.date = new FormControl("", Validators.required);
      this.tagsForm = new FormControl("");
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
    this.tagService.getTags().then(tags => this.tags = tags);

    this.userId = this.auth.getCurrentId();
  }

  isCurrentUsersEvent = (eventCreatorId: string) => parseInt(eventCreatorId) === this.userId

  saveEvent(event) {
    // console.log(this.eventForm.value);
    const data = {
      event: this.eventForm.value,
      tags: [parseInt(this.tagsForm.value)]
    };

    const promise = this.eventService.saveEvent(data);
    promise
      .then(newEvent => {
        console.log(newEvent);
        this.flash.setMessage("Successfully saved new event!");
        this.saveClick.emit();
      })
      .catch(err => {
          this.flash.setError(err.message || "Something got messed up!");
          console.log(err);
      });
  }
  clearForm() {
    this.eventForm.reset();
  }
  selectTag(options) {
    const arr = [].slice.call(options);
    const selectedTags = arr.reduce((acc, el) => el.selected ? acc.concat(parseInt(el.value)) : acc, []);
    this.selectedTags = selectedTags;
  }

}
