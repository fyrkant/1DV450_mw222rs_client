import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

import { TagService } from "../../services";

@Component({
  selector: "tag-filter-picker",
  template: `
    <div>

      <p>Filter by tag: <button *ngIf="selected" (click)="setTag.emit(null)">Show all events</button></p>
      <button *ngFor="let t of tags"
        [disabled]="t.id === selected"
        (click)="setTag.emit(t.id)"
       >
        {{t.attributes.name}}
       </button>
    </div>
  `,
  styles: [`.filter-picker {
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 100;
  }`]
})

export class TagFilterPicker implements OnInit {
  @Output() setTag = new EventEmitter();
  @Input() selected;

  tags: Array<any>;

  constructor(private tagService: TagService) {
  }
  ngOnInit() {
    this.tagService.getTags().then(tags => this.tags = tags);
  }
}
