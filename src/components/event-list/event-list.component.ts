import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TagFilterPipe, SearchPipe } from "../../pipes/";

@Component({
  selector: "event-list",
  pipes: [TagFilterPipe, SearchPipe],
  template: require("./event-list.component.html")
})
export class EventListComponent {
  @Input() events;
  @Input() selectedTag;
  @Output() onSelected = new EventEmitter();

  constructor() {}

}
