import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TagFilterPipe, SearchPipe } from "../../pipes/";

@Component({
  pipes: [
    SearchPipe,
    TagFilterPipe,
    ],
  selector: "pa-event-list",
  styles: [`
    .my-fine-list {
      overflow-y: auto;
      max-height: 300px;
    }
  `],
  template: require("./event-list.component.html"),
})
export class EventListComponent {
  @Input() public events;
  @Input() public selectedTag;
  @Input() public searchTerm;
  @Output() public onSelected = new EventEmitter();

}
