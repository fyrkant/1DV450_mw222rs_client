import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "search-box",
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
  styles: [`.cool-input {
    width: 100%;
  }`]
})
export class SearchBoxComponent implements OnInit {
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.change.emit("");
  }

}
