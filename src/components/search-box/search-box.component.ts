import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "pa-search-box",
  styles: [`.cool-input {
    width: 100%;
  }`],
  template: `
  <div>
    <md-input
      class="cool-input"
      placeholder="Search event names..."
      #input
      type="text"
      (input)="change.emit(input.value)"
      type="text"></md-input>
  </div>
  `,
})
export class SearchBoxComponent implements OnInit {
  @Output() public change = new EventEmitter();

  public ngOnInit() {
    this.change.emit("");
  }

}
