import { Component, OnInit } from "@angular/core";

import {
  TagService,
  FlashService,
} from "./../../services";

@Component({
  selector: "pa-tag-page",
  styles: [`
    .tag-page {
      margin: 10px;
    }
  `],
  template: `
  <div class="tag-page">
    <h2>Tags</h2>
    <md-input #input placeholder="Create new tag"></md-input>
    <button md-raised-button (click)="saveNew(input)" [disabled]="!input.value">Save</button>
    <button md-raised-button (click)="clear(input)" [disabled]="!input.value">Cancel</button>
    <md-list>
      <md-list-item *ngFor="let tag of tags">
        {{tag.attributes.name}} ({{tag.relationships.events.data.length}})
      </md-list-item>
    </md-list>
  </div>
  `,
})
export class TagPageComponent implements OnInit {
  private tags;

  constructor(
    private flash: FlashService,
    private tagService: TagService
  ) { }

  public saveNew(input) {
    const promise = this.tagService.saveNew(input.value);

    promise
      .then(newTag => {
        this.flash.setMessage("Successfully saved tag.");
        this.tagService.getTags().then(tags => this.tags = tags);
        this.clear(input);
      })
      .catch(err => this.flash.setError(err.message || "Something bad went down..."));
  }

  public clear(input) {
    input.value = "";
  }

  public ngOnInit() {
    this.tagService.getTags().then(tags => this.tags = tags);
  }
}
