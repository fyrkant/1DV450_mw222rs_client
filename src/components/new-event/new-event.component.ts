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
  directives: [REACTIVE_FORM_DIRECTIVES],
  selector: "pa-new-event-form",
  styles: [`.event-input {
    display: block;
    width: 250px;
  }`],
  template: require("./new-event.component.html"),
  viewProviders: [FormBuilder],
})

export class NewEventFormComponent implements OnInit {
  @Output() public saveClick = new EventEmitter();

  private events: Promise<any>;
  private places: Promise<any>;
  private tags: Promise<any>;
  private userId: number;

  private eventForm: FormGroup;
  private name: FormControl;
  private description: FormControl;
  private date: FormControl;
  private tagsForm: FormControl;
  private place_id: FormControl;

  private selectedTags;

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
        date: this.date,
        description: this.description,
        name: this.name,
        place_id: this.place_id,
      });

    }

  public ngOnInit() {
    this.eventService.getEvents().then(events => this.events = events);
    this.placeService.getPlaces().then(places => this.places = places);
    this.tagService.getTags().then(tags => this.tags = tags);

    this.userId = this.auth.getCurrentId();
  }

  public stringDater(dateString) {
    return new Date(dateString);
  }

  public isCurrentUsersEvent = (eventCreatorId: string) => parseInt(eventCreatorId, 10) === this.userId

  public saveEvent(event) {
    // console.log(this.eventForm.value);
    const data = {
      event: this.eventForm.value,
      tags: [ parseInt(this.tagsForm.value, 10) ],
    };

    const promise = this.eventService.saveEvent(data);
    promise
      .then(newEvent => {
        // console.log(newEvent);
        this.flash.setMessage("Successfully saved new event!");
        this.saveClick.emit();
      })
      .catch(err => {
          this.flash.setError(err.message || "Something got messed up!");
          // console.log(err);
      });
  }
  public clearForm() {
    this.eventForm.reset();
  }
  public selectTag(options) {
    const arr = [].slice.call(options);
    const selectedTags = arr.reduce((acc, el) => el.selected ? acc.concat(parseInt(el.value, 10)) : acc, []);
    this.selectedTags = selectedTags;
  }

}
