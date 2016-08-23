import { Component, OnInit } from "@angular/core";

import {
  PlaceService,
  FlashService,
} from "./../../services";

@Component({
  selector: "pa-place-page",
  styles: [`
    .place-page {
      margin: 10px;
    }
  `],
  template: `
  <div class="place-page">
    <h2>Places</h2>
    <md-input #input placeholder="Enter address of new place"></md-input>
    <button md-raised-button (click)="saveNew(input)" [disabled]="!input.value">Save</button>
    <button md-raised-button (click)="clear(input)" [disabled]="!input.value">Cancel</button>
    <md-list>
      <md-list-item *ngFor="let place of places">
        {{place.attributes.name}} ({{place.relationships.events.data.length}})
      </md-list-item>
    </md-list>
  </div>
  `,
})
export class PlacePageComponent implements OnInit {
  private places;

  constructor(
    private flash: FlashService,
    private placeService: PlaceService
  ) { }

  public saveNew(input) {
    // console.log(input.value);
    const promise = this.placeService.saveNew(input.value);

    promise
      .then(newTag => {
        this.flash.setMessage("Successfully saved place.");
        this.placeService.getPlaces().then(places => this.places = places);
        this.clear(input);
      })
      .catch(err => this.flash.setError(err.message || "Something bad went down..."));
  }

  public clear(input) {
    input.value = "";
  }

  public ngOnInit() {
    this.placeService.getPlaces().then(places => this.places = places);
  }
}
