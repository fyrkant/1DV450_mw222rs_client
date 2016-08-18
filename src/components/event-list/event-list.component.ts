import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TagFilterPipe, SearchPipe } from "../../pipes/";

@Component({
  selector: "event-list",
  pipes: [TagFilterPipe, SearchPipe],
  template: require("./event-list.component.html"),
  styles: [`
    .my-fine-list {
      overflow-y: auto;
      max-height: 300px;
    }
  `]
})
export class EventListComponent {
  @Input() events;
  @Input() selectedTag;
  @Input() searchTerm;
  @Output() onSelected = new EventEmitter();

  constructor() {}

}
