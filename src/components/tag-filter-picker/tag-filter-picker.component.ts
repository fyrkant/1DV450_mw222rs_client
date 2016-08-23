import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

import { TagService } from "../../services";

@Component({
  selector: "pa-tag-filter-picker",
  styles: [`.filter-picker {
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 100;
  }`],
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
})

export class TagFilterPickerComponent implements OnInit {
  @Output() public setTag = new EventEmitter();
  @Input() public selected;

  private tags: Array<any>;

  constructor(private tagService: TagService) {
  }
  public ngOnInit() {
    this.tagService.getTags().then(tags => this.tags = tags);
  }
}
